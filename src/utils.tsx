export const fetchWithErrorCheck = async (
  url: string,
  setIsLogged: any,
  jsonify: boolean = true,
  chart: boolean = false
) => {
  let response;
  let data;

  try {
    response = await fetch(url);

    if (!response.ok) {
      if (response.status === 401) {
        setIsLogged(false);
        if (chart) {
          return 1;
        }
        throw new Error(
          `HTTP ошибка! Пользователь не авторизован. Status: ${response.status}`
        );
      } else {
        throw new Error(`HTTP ошибка! Status: ${response.status}`);
      }
    }

    if (url === "/api/profile") {
      return setIsLogged(true);
    }

    if (jsonify) {
      data = await response.json();
      return data.data;
    } else {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
};