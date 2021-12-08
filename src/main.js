import "./css/style.css";
import View from "./js/view";
import data from "./data.json";

const contacts = document.querySelector("#contacts");
const details = document.querySelector(".details-view");
const contactDetails = document.querySelector("#contact-details");
const freindsList = document.querySelector("#freindsList");
const nonefreindsList = document.querySelector("#nonefreindsList");
const popularList = document.querySelector("#popularList");
let users = {};
let popularPeopleSummury = [];

const getData = (data) => {
  let popularPeople = {};

  data.forEach((user) => {
    const item = { name: user.name, friends: user.friends };

    users[String(user.id)] = item;
    user.friends.forEach((friend) => {
      if (popularPeople.hasOwnProperty(friend)) {
        popularPeople[friend].total += 1;
      } else {
        popularPeople[friend] = { total: 1, name: user.name };
      }
    });
  });

  let max = "";
  popularPeopleSummury = Object.keys(popularPeople).reduce(function (acc, val) {
    if (max < popularPeople[val].total)
      (max = popularPeople[val].total), (acc = []);
    if (popularPeople[val].total == max) acc.push(popularPeople[val].name);
    return acc;
  }, []);
  popularPeopleSummury.sort();
};

const renderUsers = (data) => {
  contacts.innerHTML += View.render("users", {
    contacts: data,
  });
};

const renderSelectedUser = (renderedContact) => {
  contactDetails.innerHTML += View.render("contactDetails", renderedContact);
};

const renderPopularPeople = (popularPeople) => {
  popularList.innerHTML += View.render("people", {
    title: "Популярные люди",
    people: popularPeople,
  });
};

const renderFriendsList = (friendsList) => {
  freindsList.innerHTML += View.render("people", {
    title: "Друзья",
    people: friendsList,
  });
};

const renderNoFriendsList = (noFriendsList) => {
  nonefreindsList.innerHTML += View.render("people", {
    title: "Не в друзьях",
    people: noFriendsList,
  });
};

getData(data);
renderUsers(data);
renderPopularPeople(popularPeopleSummury);

contacts.addEventListener("click", (e) => {
  const contact = e.target;

  if (contact.tagName === "LI") {
    if (details.classList.contains("details-view--hidden")) {
      details.classList.remove("details-view--hidden");

      const renderedContact = users[contact.id];
      renderSelectedUser(renderedContact);

      const buttonBack = document.querySelector('[data-id="control-back"]');
      const handlerBackIcon = (e) => {
        if (!details.classList.contains("details-view--hidden")) {
          details.classList.add("details-view--hidden");

          contactDetails.innerHTML = "";
          freindsList.innerHTML = "";
          nonefreindsList.innerHTML = "";
        }
      };

      buttonBack.addEventListener("click", handlerBackIcon);

      const currentFriends = users[String(contact.id)].friends;
      const friendsList = currentFriends.map(
        (friend) => users[String(friend)].name
      );
      renderFriendsList(friendsList);

      let noFriendsList = [];
      for (let userId of Object.keys(users)) {
        if (!currentFriends.includes(+userId)) {
          const item = users[+userId]?.name;
          noFriendsList.push(item);
        }
      }
      renderNoFriendsList(noFriendsList);
    }
  }
});
