import {Category} from "@/services/api/gen";
import {categoryApi} from "@/services/api";
import {DataProvider} from "@/services/api/provider/data_provider";

export interface CategoryProvider extends DataProvider<Category> {}

export const CategoryProvider: {getMany(): Promise<Category[]>} = {
  async getMany(): Promise<Category[]> {
    return (await categoryApi().getCategories()).data;
  },
};
