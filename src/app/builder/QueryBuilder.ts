import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  //Searching
  search(searchableFeilds: string[]) {
    if (this.query?.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFeilds.map((field) => {
          return {
            [field]: { $regex: this.query.searchTerm, $options: 'i' },
          };
        }),
      } as FilterQuery<T>);
    }
    return this;
  }

  // Filtering
  filter() {
    const queryObj = { ...this.query };

    const filterExcludedFields = [
      'searchTerm',
      'sort',
      'limit',
      'page',
      'fields',
    ];
    filterExcludedFields.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  // Sorting
  sort() {
    let sort = this.query?.sort || '-createdAt';

    this.modelQuery = this.modelQuery.sort(sort as FilterQuery<T>);
    return this;
  }
  paginate() {
    const limit = Number(this.query?.limit) || 10;
    const page = Number(this.query.page) || 1;
    const skip = (page - 1) * limit || 0;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
