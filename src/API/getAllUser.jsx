import { baseURL } from "./helpher";

export function getAllUser(page, limit, search, setFinalData, setTotalItems) {
  return async () => {
    try {
      const response = await fetch(
        `${baseURL}user/getall?page=${page + 1}&limit=${limit}&search=${search}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data) {
        setFinalData(data);

        let newData = [];

        setTotalItems(data && data.total_items);

        data &&
          data.data &&
          data.data.map((item, index) => {
            newData.push({
              slno: page * limit + index + 1,
              ...item,
            });
          });
        if (newData && newData.length > 0) {
          setFinalData(newData);
        } else {
          setFinalData([]);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
}
