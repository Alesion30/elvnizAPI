type Status = 200 | 403 | 404 | 500;

export const getResponse = (
  data: any,
  status: Status = 200,
  message: string = ""
) => {
  if (message === "") {
    switch (status) {
      case 200:
        message = "success";
        break;
      case 403:
        message = "authentication error";
        break;
      case 404:
        message = "not found";
        break;
      case 500:
        message = "something error";
        break;
    }
  }
  return { data, status, message };
};
