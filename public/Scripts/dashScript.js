// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

(() => {
  document.getElementById("body").style.background-image == 'linear-gradient(rgba(21, 35, 44, 0.95), rgba(21, 35, 44, 0.95)) , url("./public/background.jpg")';
  
});