// src/services/hhApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// fetchBaseQuery надсройка над fetch

// Типы данных ответа HH (упрощённо)
export type Vacancy = {
  // описывает одну вакансию 
  id: string
  name: string
  alternate_url: string
  area?: { id: string; name: string }
  employer?: { id?: string; name?: string }
  salary?: { from?: number; to?: number; currency?: string } | null
}

export type VacanciesResponse = {
  // то что мы получаем после ответа
  items: Vacancy[]
  found: number
  pages: number
  page: number
  per_page: number
}

// Создаём API  reducerPath - имя среза состояния в редукс
export const hhApi = createApi({
  reducerPath: 'hhApi',
  // baseQuery - задает базовый способ выполнения запросов
  baseQuery: fetchBaseQuery({
    // baseUrl - базовый url всех endpointov
    baseUrl: 'https://api.hh.ru/',
    prepareHeaders: (headers) => {
      // prepareHeaders - фун-ия позволяющая ставить заголовки 
      // HH требует User-Agent (или HH-User-Agent)
      headers.set('User-Agent', 'my-hh-app/1.0 (email@example.com)')
      return headers
    },
  }),
  // эндпоинты, описуем все методы Api
  endpoints: (build) => ({
    // эндпоинт для поиска вакансий
    // VacanciesResponse - что придет в дата
    getVacancies: build.query<
    // { ... } — что ты передаёшь в хук (параметры фильтрации).
      VacanciesResponse,
      { text?: string; industry?: number; professional_role?: number; page?: number; per_page?: number; area?: string }
    >({
      query: (params) => {
        const { area, ...otherParams } = params;
        const queryParams = {
          ...otherParams,
          professional_role: 96,
          // Если текст пустой, не добавляем параметр text
          ...(params.text === '' ? {} : { text: params.text }),
          // Если город не "all", добавляем параметр area
          ...(area && area !== 'all' ? { area } : {})
        };
        
        return {
          url: 'vacancies',
          params: queryParams
        };
      },
    }),
  }),
})

// Автогенерация хуков
export const { useGetVacanciesQuery } = hhApi
