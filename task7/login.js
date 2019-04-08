loginModule = (function () {

   let tryLog = () =>{
       let log = document.getElementsByName('name')[0].value;
       let pas = document.getElementsByName('password')[0].value;
       let tmpUser = JSON.parse(localStorage.getItem('logins')).find((item) => item.login == log);
       if (tmpUser === undefined)
           alert("bad login");
       else{
           if (tmpUser.password === pas){
               localStorage.removeItem('user');
               localStorage.setItem('user', log);
               window.open("index.html", "_self");
           }else{
               alert("bad password");
           }
       }
   };

   let check = () =>{
       if (!(localStorage.getItem('user') === 'guest'))
           window.open("error.html", "_self");
   };

   return{
       tryLog,
       check
   }
}());