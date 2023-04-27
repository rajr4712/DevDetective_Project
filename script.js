//All id and class fetch from html files in js
const searchbar = document.querySelector(".searchbar-container");             //loc40 in html
const profilecontainer = document.querySelector(".profile-container");      //loc 53
const root = document.documentElement.style;
const get = (param) => document.getElementById(`${param}`);              //param is a callback function name 
const url = "https://api.github.com/users/";
//to check: copy this url and paste it on browser and last me name write "users/ iske bagal me pranaygupta, all responce will show in ur browser it put in 101 to 119loc
//get is a document.getElementId in short form to acess class or id or 
const noresults = get("no-results");              
//const noresults = document.getElementById("no-results"); also u can write instead of get in all
const btnmode = get("btn-mode");                            //btn-mode is a id loc29 in html file wch acess Dark text and moon image
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");                            //loc 49 search button 
const input = get("input");                                  //loc 41 in html input tag fetch
const avatar = get("avatar");
const userName = get("name");                                 //loc 63
const user = get("user");                                     //loc 65
const date = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");                                     
const followers = get("followers");                          
const following = get("following");                          
const user_location = get("location");                     
const page = get("page");
const twitter = get("twitter");                           
const company = get("company");                        

//at starting Darkmode is hidden(false) 
let darkMode = false;

// Event Listeners on Search button(btnsubmit)
btnsubmit.addEventListener("click", function () {        
  if (input.value !== "") {                        // if input tag me value empty nhi ho mns kuch git userId enter hai 
    getUserData(url + input.value);                 //then call a getUserdata function loc 72 wch used to fetch user git api from remote server
  }                                                 //for api call we need pass url and input.value- input tag pe jo value enter hai wo url k last me add ho ja rha hai loc 6 me
});
//url : url is variable loc6 where all user git id are stored in git api link(location)

 
//The keydown event is fired when a key is pressed.(e-event)
input.addEventListener(
  "keydown",                                  
  function (e) {
    if (e.key == "Enter") {                               //when Enter key button is press enter then if input tag k under value empty nhi hai user id is enter
      if (input.value !== "") {
        getUserData(url + input.value);                      //call again a getUserData function
      }
    }
  },
  false                                                    //if not then keydown event not worked
); 

//input tag (enter a gituser name ) pe event listner add
input.addEventListener("input", function () {      
  noresults.style.display = "none";                    //when search any user name in input then "no search result" text will hide
  profilecontainer.classList.remove("active");   
  searchbar.classList.add("active");                  //searchbar is a variable where searchbar-container(input tag)  iske css classList ko active(uske cssproperties apply) kr denge
});

//at start me moon icon and Dark Text pe loc11in eventListner applied 
btnmode.addEventListener("click", function () {
  if (darkMode == false) {         //when click if darkmode is false nhi hai then call darkModeProperties();
    darkModeProperties();          //this darkmodeProperties enable darkmode and all whatever inside written in his function
  } else {
    lightModeProperties();         //if darkmode is present and user click on it then call lightModeProperties();
  }                                 //its work is enable lightMode and all whatever written in this function
});


// Functions to CALL API (which is used to fetch user data from a remote server.)
function getUserData(gitUrl) {                       //api url pass to fetch
  fetch(gitUrl)                                     // Git Api fetch according to user id enter
    .then((response) => response.json())            //api k responce json me convert 
    .then((data) => {
      console.log(data);
      updateProfile(data);                        //call a updateProfile(data) function where api data pass to render(display) value on ui
    })

    .catch((error) => {
      throw error;
    });
}

//render (Display on UI) param is parameter in short form jo function k under pass kate hai
function updateProfile(data) {
  if (data.message !== "Not Found") {         //if data message is found  then display on every html element pe 102 to 120loc
    noresults.style.display = "none";          //then no user result text will hidden
    function checkNull(param1, param2) {
      if (param1 === "" || param1 === null) {       //if parameter1 is empty or null both is same thing       
        param2.style.opacity = 0.5;
        param2.previousElementSibling.style.opacity = 0.5;
        return false;
      } else {
        return true;
      }
    } 
   
    //json Api object se value set
    //copy api link loc7 and paste on browswer by add name in last , json object comes ,now wha se what we need and how put written all there (data is parameter passed in 87 )
    avatar.src = `${data.avatar_url}`;           //avtar is a variable where avtaar id fetch  loc 16 uske src me url daal diye jis se wah image aa jaye     
    userName.innerText = data.name === null ? data.login : data.name;    //ternary operator use,if name is not present json object then put login id and if present then put a user-name 
    user.innerText = `@${data.login}`;          //user is variable where used id fetch loc18 in js jisme innerText k through user ka data.login put kiya gaya hai according to user its display on screen
    user.href = `${data.html_url}`;             //user id k href # k place pe link pe put wch work redirected to github overview page
    datesegments = data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
    bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;   //IF in json object me null value pada hai then show message "This profile has no bio" , and if present bio put kr denge usme 
    repos.innerText = `${data.public_repos}`;          //repo is id loc77 in html where how many repository file created put(it is public)
    followers.innerText = `${data.followers}`;        //followers is id in loc82 in html where followers value put
    following.innerText = `${data.following}`;        //following is id loc87 in html where follwing value put
    user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
    page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
    page.href = checkNull(data.blog, page) ? data.blog : "#";
    twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
    twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
    company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
    searchbar.classList.toggle("active");
    profilecontainer.classList.toggle("active"); 
  } else {
    noresults.style.display = "block";      
  }
}   //TO BETTER CLEAR loc 102 - if you copy api link from loc7 and paste it in browser by attach name of pranaygupta you see in name section -null value , so in this case login id show in data


//The code is check if the user's browser supports dark mode.If it does, then it will set a variable called "prefersDarkMode" to true.where dark color give in prefers-color-scheme
const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;


//Switch to Dark mode properties  (lm:light mode value will changed of root in darkmode loc 1 to 11 of css file ka)
function darkModeProperties() {
  root.setProperty("--lm-bg", "#141D2F");                      //bg- background dark value written
  root.setProperty("--lm-bg-content", "#1E2A47");            //background content dark value is changed 
  root.setProperty("--lm-text", "white");                     //text dark value me white
  root.setProperty("--lm-text-alt", "white");                
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");       //shadow color changed of root
  modetext.innerText = "LIGHT";                                 
  modeicon.src = "./assets/images/sun-icon.svg";           //in dark mode sun icon come to enable light mode
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkMode = true;                                        //true:dark mode enable
  localStorage.setItem("dark-mode", true);                //Localstorage me set darkmode ko enable kr diye
}

//Switch to light mode properties (its same root value as it is written in css file loc 1 to11)
function lightModeProperties() {
  root.setProperty("--lm-bg", "#F6F8FF");            
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "./assets/images/moon-icon.svg";           //in light mode moon icon is show to enable dark mode
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;                                             
  localStorage.setItem("dark-mode", false);
}

profilecontainer.classList.toggle("active");
searchbar.classList.toggle("active");

//by default pranaygupta git id display
getUserData(url + "thepranaygupta");