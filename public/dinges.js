const h = document.getElementById("naampersoon")
const h3 = document.getElementById("gender")
const p1 = document.getElementById("nationaal")

function getUsers() {
    fetch("https://randomuser.me/api/?results=5&inc=name,gender,nat,registered")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        console.log(data);
        h.innerText = `${data.results[0].name.first} ${data.results[0].name.last} `
        h3.innerText = `${data.results[0].gender} `
        p1.innerText = `${data.results[0].nat}`});
}
  
getUsers();