import { useQuery } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import type { IDeal } from "~/types/deals.types";
import { KANBAN_DATA } from "./kanban.data";

export function useKanbanQuery() {
  return useQuery({
    queryKey: ["deals"],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
    select(data) {
      const newBoard = [] as IColumn[]; // Инициализируем пустой массив колонок
    
      const deals = data.documents as IDeal[]; // Получаем массив сделок из данных
    
      // Создаем объект, который будет содержать сделки для каждой колонки
      const dealsByStatus: { [key: string]: IDeal[] } = {};
    
      // Группируем сделки по статусу
      deals.forEach(deal => {
        if (!dealsByStatus[deal.status]) {
          dealsByStatus[deal.status] = [];
        }
        dealsByStatus[deal.status].push(deal);
      });
    
      // Создаем новый объект колонки на основе KANBAN_DATA, но с добавленными сделками
      KANBAN_DATA.forEach(columnData => {
        const column: IColumn = {
          id: columnData.id,
          name: columnData.name,
          items: dealsByStatus[columnData.id] || [], // Используем сделки для данного статуса, если они есть
        };
        newBoard.push(column);
      });
    
      return newBoard; // Возвращаем новый объект доски
    },
    
    
  });
}
