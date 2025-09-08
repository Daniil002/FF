import { useEffect, useState } from "react";
import { useGetVacanciesQuery } from "../../store/vacancy.api";
import Card from "../Card/Card";
import PaginationComponent from "../Pagination/Pagination";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useSearchParams } from "react-router"; // добавлено: синхронизация с URL

const CardList = () => {
  const [page, setPage] = useState(1); 
  const searchText = useSelector((state: RootState) => state.input.searchText);
  const selectedCity = useSelector((state: RootState) => state.input.selectedCity);
  const skills = useSelector((state: RootState) => state.input.skills);
  const [searchParams, setSearchParams] = useSearchParams(); // добавлено

  const { data, error, isLoading } = useGetVacanciesQuery({
    // хук следит за изменением параметров, если что-то поменялось , отправляем запрос на апишку
    text: searchText,
    area: selectedCity,
    skill_set: skills,
    per_page: 10,
    page: page - 1, // апи ожидает нумерацию с 0
  });

  // добавлено: держим текущую страницу в URL (page)
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    if (page > 1) next.set('page', String(page)); else next.delete('page');
    setSearchParams(next, { replace: true });
  }, [page]);

  // добавлено: инициализация страницы из URL при монтировании/изменении
  useEffect(() => {
    const p = Number(searchParams.get('page') || '1');
    if (!Number.isNaN(p) && p !== page) setPage(p);
  }, [searchParams]);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки</p>;
  if (!data || data.items.length === 0) return <p>Вакансий не найдено</p>;

  return (
    <div>
      {data.items.map((vacancy) => (
        <Card key={vacancy.id} vacancy={vacancy} />
      ))}

      <PaginationComponent 
        total={Math.ceil(data.found / 10)} 
        page={page}
        onChange={setPage}
      />
    </div>
  );
};

export default CardList;
