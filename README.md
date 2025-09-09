# Как устроен роутер в проекте (подробно для новичка)

## Зачем нужен роутер
- Роутер в SPA (Single Page Application) позволяет показывать разные экраны по разным URL без полной перезагрузки страницы.
- Пользователь может:
  - открывать прямые ссылки на нужные экраны,
  - использовать кнопки браузера «назад/вперёд»,
  - делиться ссылками, которые восстанавливают состояние страницы.

## Где включён роутер
- Роутер подключён в `src/main.tsx`.
- Вокруг всего приложения обёртка `BrowserRouter`, чтобы маршрутизация работала во всех компонентах.
- Также здесь подключены Redux `Provider` и тема Mantine.

```12:18:FF/src/main.tsx
  <BrowserRouter>
    <Provider store={store}>
        <MantineProvider>
          <App />
        </MantineProvider>
    </Provider>
  </BrowserRouter>
```

## Где описаны маршруты
- Основные маршруты заданы в `src/App.tsx` через `Routes`/`Route`:
  - `/` — список вакансий (поиск, фильтры, результаты, пагинация)
  - `/vacancies/:id` — страница конкретной вакансии по её `id`

```12:24:FF/src/App.tsx
      <Routes>
        <Route path="/" element={
          <>
            <Input />
            <div className="main-content">
              <Filter />
              <CardList />
            </div>
          </>
        } />
        <Route path='/vacancies/:id' element={<Vacancy />} />
      </Routes>
```

### Что такое `:id`
- Это динамический сегмент URL. Например, `/vacancies/123` откроет вакансию с `id = 123`.
- Получить `id` на странице можно через хук `useParams()`.

## Как выполняется переход на детальную страницу
- В `src/components/Card/Card.tsx` есть кнопка «Смотреть вакансию». По клику выполняется навигация на `/vacancies/{id}` с помощью `useNavigate()`.
- Дополнительно текущая вакансия передаётся через `state`, чтобы не ждать повторной загрузки при переходе со списка.

```25:33:FF/src/components/Card/Card.tsx
  const handleViewButtonClick = () => {
    navigate(`/vacancies/${vacancy.id}`, { 
      state: { 
        from: "PostsPage",
        vacancyData: vacancy
      } 
    });
  };
```

## Как страница вакансии получает данные
- Файл `src/components/Vacancy/Vacancy.tsx`:
  - Извлекает `id` из URL: `const { id } = useParams()`.
  - Если `vacancyData` пришёл через `location.state` — использует его.
  - Если данных нет — делает запрос на API через RTK Query по `id`.
  - Сверху рендерится обычная карточка `Card` (тот же вид, что в списке), ниже — описание (`snippet`) и ссылка на оригинал.

```5:22:FF/src/components/Vacancy/Vacancy.tsx
  const { id } = useParams();
  const location = useLocation();
  const { vacancyData } = location.state || {};
  const { data, isLoading, error } = useGetVacancyByIdQuery(id as string, { skip: !!vacancyData });
  const vacancy = vacancyData || data;
```

## Синхронизация фильтров со строкой адреса (URL search params)
Страница списка поддерживает двустороннюю синхронизацию фильтров с URL — это удобно для шаринга и навигации.

- Параметры URL:
  - `q` — строка поиска
  - `city` — выбранный город
  - `skills` — список навыков через запятую (например, `react,typescript`)
  - `page` — номер страницы

- Где реализовано:
  - `src/components/Input/Input.tsx` — читает/записывает `q`
  - `src/components/Filter/Filter.tsx` — читает/записывает `city` и `skills`
  - `src/components/CardList/CardList.tsx` — читает/записывает `page`

- Как это работает:
  - Используем `useSearchParams()` из `react-router`.
  - При действиях пользователя обновляем URL (добавляем/обновляем/удаляем параметры).
  - При монтировании читаем параметры из URL и устанавливаем значения в Redux/локальное состояние.
  - При нажатии «назад/вперёд» компоненты считывают новые параметры и обновляют себя.

### Примеры ссылок
- `/?q=react`
- `/?city=1`
- `/?skills=react,typescript`
- `/?q=react&city=1&skills=react,typescript&page=2`

## Где формируются запросы к API (RTK Query)
- В `src/store/vacancy.api.ts`:
  - `getVacancies` — возвращает список вакансий с фильтрами (`text`, `area`, `skill_set`, `page`, `per_page`).
  - `getVacancyById` — возвращает одну вакансию по `id`.

```47:68:FF/src/store/vacancy.api.ts
    getVacancies: build.query<
      VacanciesResponse,
      { text?: string; industry?: number; professional_role?: number; page?: number; per_page?: number; area?: string; skill_set?: string[] }
    >({
      query: (params) => {
        const { area, skill_set, ...otherParams } = params;
        const queryParams = {
          ...otherParams,
          professional_role: 96,
          ...(params.text === '' ? {} : { text: params.text }),
          ...(area && area !== 'all' ? { area } : {}),
          ...(skill_set && skill_set.length > 0 ? { skill_set: skill_set.join(',') } : {})
        };
        return { url: 'vacancies', params: queryParams };
      },
    }),
    getVacancyById: build.query<Vacancy, string>({
      query: (id) => ({ url: `vacancies/${id}` }),
    }),
```

## Почему важно хранить фильтры в URL
- Можно поделиться ссылкой с уже выбранными фильтрами.
- После перезагрузки состояние не теряется — восстанавливается из адресной строки.
- Кнопки «назад/вперёд» работают ожидаемо.
- Поддержка и отладка упрощаются: по ссылке видно текущие параметры.

## Полезные хуки из `react-router`
- `useNavigate()` — программные переходы между страницами.
- `useParams()` — чтение параметров динамического сегмента (`:id`).
- `useLocation()` — доступ к текущему расположению и `state`.
- `useSearchParams()` — чтение/запись параметров в строке запроса (после `?`).

Если ты только начинаешь, смотри порядок: `App.tsx` → `Card.tsx` (переход на детали) → `Vacancy.tsx` (загрузка по id) → `Input/Filter/CardList` (синхронизация параметров URL).
