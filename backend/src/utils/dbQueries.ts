export interface IResult {
  success: boolean;
  queryResponse: any;
  responseCount?: number;
  message: string;
}

export interface IPaginationResult {
  success: boolean;
  queryResponse: any;
  responseCount: number;
  paginationData: {
    totalNumberOfResults: number;
    numberOfPages: number;
  };
  message: string;
}

export const findOne = async (params: { model: any; obj: any }) => {
  const result: IResult = {
    success: false,
    queryResponse: null,
    message: null,
  };

  await new Promise<void>((resolve) => {
    params.model.findOne(params.obj, (err: any, res: any) => {
      if (err) {
        result.message = 'Database connection failed';
      } else {
        result.success = true;
        result.queryResponse = res;
      }

      resolve();
    });
  });

  return result;
};

export const findAll = async (params: {
  model: any;
  obj: any;
  limit?: number;
}) => {
  const result: IResult = {
    success: false,
    queryResponse: null,
    message: null,
  };

  const limit = params.limit ? params.limit : 0;

  await new Promise<void>((resolve) => {
    params.model
      .find(params.obj, (err: any, res: any) => {
        if (err) {
          result.message = 'Database connection failed';
        } else {
          result.success = true;
          result.queryResponse = res;
        }

        resolve();
      })
      .limit(limit);
  });

  return result;
};

export const addNew = async (params: { model: any; obj: any }) => {
  const result: IResult = {
    success: false,
    queryResponse: null,
    message: null,
  };

  await new Promise<void>((resolve) => {
    new params.model(params.obj)
      .save()
      .then((res: any) => {
        result.success = true;
        result.queryResponse = res;
        resolve();
      })
      .catch((err: any) => {
        result.message = 'Something went wrong';
        resolve();
      });
  });

  return result;
};

export const addMany = async (params: { model: any; obj: any[] }) => {
  const result: IResult = {
    success: false,
    queryResponse: null,
    message: null,
  };

  await new Promise<void>((resolve) => {
    params.model.insertMany(params.obj, (err: any, res: any) => {
      if (err) {
        console.log({ err });
        result.message = 'Database connection failed';
      } else {
        if (res) {
          result.success = true;
          result.queryResponse = res._doc;
        } else {
          result.message = 'Invalid request';
        }
      }

      resolve();
    });
  });

  return result;
};

export const updateOne = async (params: {
  element: any;
  updateObject: any;
}) => {
  const result: IResult = {
    success: false,
    queryResponse: null,
    message: null,
  };

  await new Promise<void>((resolve) => {
    for (const key in params.updateObject) {
      params.element[key] = params.updateObject[key];
    }

    params.element
      .save()
      .then((res: any) => {
        result.success = true;
        result.queryResponse = res;

        resolve();
      })
      .catch((err: any) => {
        result.message = 'Something went wrong';
        resolve();
      });
  });

  return result;
};

export const findAllWithPagination = async (params: {
  model: any;
  obj: any;
  limit?: number;
  skip?: number;
  sort?: any;
}) => {
  const result: IPaginationResult = {
    success: false,
    queryResponse: null,
    responseCount: 0,
    paginationData: {
      totalNumberOfResults: 0,
      numberOfPages: 0,
    },
    message: null,
  };

  await new Promise<void>(async (resolve) => {
    const limit = params.limit ? params.limit : 0;
    const skip = params.skip ? params.skip : 0;

    const aggregateArray = [];

    aggregateArray.push({
      $match: params.obj,
    });

    if (params.sort) {
      aggregateArray.push({
        $sort: params.sort,
      });
    }

    const dataArray = [];

    dataArray.push({
      $skip: skip,
    });

    if (limit) {
      dataArray.push({
        $limit: limit,
      });
    }

    aggregateArray.push({
      $facet: {
        totalRecords: [
          {
            $count: 'total',
          },
        ],
        data: dataArray,
      },
    });

    await params.model
      .aggregate(aggregateArray)
      .then((response: any) => {
        result.success = true;
        result.queryResponse = response[0].data;
        result.responseCount = response[0].data.length;
        if (response[0].totalRecords[0]) {
          result.paginationData.totalNumberOfResults =
            response[0].totalRecords[0].total;
        }
      })
      .catch((err: any) => {
        result.message = 'Database connection failed';
      });

    if (result.success) {
      const totalNumberOfResults = result.paginationData.totalNumberOfResults;
      let numberOfPages = 0;

      if (totalNumberOfResults) {
        if (limit > 0) {
          const numberOfPagesCalculation = totalNumberOfResults / limit;
          const numberOfPagesInteger = Math.floor(numberOfPagesCalculation);

          if (numberOfPagesCalculation === numberOfPagesInteger) {
            numberOfPages = numberOfPagesInteger;
          } else {
            numberOfPages = numberOfPagesInteger + 1;
          }
        } else {
          numberOfPages = 1;
        }
      }

      result.paginationData.numberOfPages = numberOfPages;
    }

    resolve();
  });

  return result;
};
