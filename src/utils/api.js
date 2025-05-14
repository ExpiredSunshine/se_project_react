const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function postItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Post failed: ${res.status}`)
  );
}

function deleteItem(id) {
  return fetch(`http://localhost:3001/items/${id}`, { method: "DELETE" });
}

export { getItems, postItem, deleteItem };
