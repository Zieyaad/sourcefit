// JAVASCRIPT LAYER [APP.JS]  =========================================================================================

new Vue({
  el: '#app',
  data: {
    articles: [],
    email: false,
    password: false,
    submitable: false
  },
  methods: {
    getUsers: function() {
      var get = this;
      axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(function(response) {
        get.articles = response.data.slice(0, 3);
      }, function(error) {
        console.log(error.statusText);
      });
    },
    validateForm: function(){
      var emailRegex = /^[a-zA-Z0-9._-]+(@{1})[a-zA-Z0-9.-]+\.[a-zA-Z]{1,5}$/;  
      var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g;
      var emailField = document.querySelector('#signEmail');
      var passwordField = document.querySelector('#signPassword');

      var submissionData = {
        email: emailField.value,
        password: passwordField.value
      };

      if (emailRegex.test(submissionData.email)) {
        this.email = true;
        emailField.classList.remove("a-error");
        emailField.classList.add("a-valid");  
      } else {
        this.email = false; 
        emailField.classList.add("a-error");
        emailField.classList.remove("a-valid");      
      }

      if (passwordRegex.test(submissionData.password)) {
        this.password = true;
        passwordField.classList.remove("a-error");
        passwordField.classList.add("a-valid");  
      } else {
        this.password = false;    
        passwordField.classList.add("a-error");  
        passwordField.classList.remove("a-valid");  
      }

      if (this.email && this.password) {
        this.submitable = true;
      } else {
        this.submitable = false;        
      }

      if (this.submitable == true){
        //axios.post('https://reqres.in/api/users', submissionData)
        axios.post('https://reqres.in/api/register', submissionData)
        .then(function (response) {
          console.log(response);
        });
      }
    }
  },
  mounted: function() {
    this.getUsers();
  }
})

// FILE END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++