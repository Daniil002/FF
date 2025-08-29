import { useState } from "react";
import { useGetVacanciesQuery } from "../../store/vacancy.api";
import Card from "../Card/Card";
import PaginationComponent from "../Pagination/Pagination";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const CardList = () => {
  const [page, setPage] = useState(1); // номер страницы (HH API начинает с 0!)
  const searchText = useSelector((state: RootState) => state.input.searchText);
  const selectedCity = useSelector((state: RootState) => state.input.selectedCity);
  const skills = useSelector((state: RootState) => state.input.skills);

  const { data, error, isLoading } = useGetVacanciesQuery({
    // хук следит за изменением параметров, если что-то поменялось , отправляем запрос на апишку
    text: searchText,
    area: selectedCity,
    skill_set: skills,
    per_page: 10,
    page: page - 1, // hh.ru ожидает нумерацию с 0
  });

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
