export const fetchWithErrorCheck = async (
  url: string,
  setIsLogged: any,
  jsonify: boolean = true
) => {
  let response;
  let data;

  try {
    response = await fetch(url);

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.setItem("IS_LOGGED", "false");
        setIsLogged(false);
        throw new Error(
          `HTTP ошибка! Пользователь не авторизован. Status: ${response.status}`
        );
      } else {
        throw new Error(`HTTP ошибка! Status: ${response.status}`);
      }
    }

    if (url === "/api/profile") {
      localStorage.setItem("IS_LOGGED", "true");
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

export const colors = {
  curr: "#6929c4",
  deals: "#1192e8",
  orders: "#005d5d",
  ordersBackground: "#005d5d77",
  lots: "#9f1853",
  lotsBackground: "#9f185377",
  gameConcurrentInGame: "#fa4d56",
  gameConcurrentTwitchViewers: "#570408",
  steamConcurrentOnline: "#198038",
  steamConcurrentInGame: "#002d9c",
};

const escape = (x: string) => {
  // https://www.npmjs.com/package/escape-string-regexp
  return "\\^$*+?.()|{}[]".includes(x) ? "\\" + x : x
}

export const filterItem = (inputText: string, marketHashName: string, marketName: string | null) => {
  const regex = new RegExp(inputText.split("").map(x => "(" + escape(x) + ").*").join(""), 'gi')
  return Boolean(marketHashName.match(regex)) || Boolean((marketName || "").match(regex))
}

export const formatText = (s: string) => {
  // Выделить английские символы жирным шрифтом

  let c
  let result = ``
  for (let i = 0; i < s.length; i++) {
    c = s[i].charCodeAt(0)
    if (c >= 97 && c <= 122 || c >= 65 && c <= 90) {
      result += `<span class="english-letter">${s[i]}</span>`
    } else {
      result += s[i]
    }
  }
  return <span dangerouslySetInnerHTML={{__html: result}} />
}