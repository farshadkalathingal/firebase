
/** Navbar Scroll */
$(function() {
    $(document).scroll(function() {
          var $nav = $("nav");
          $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});



var db = firebase.firestore();
// db.collection("users").add({
//     first: "Alan",
//     middle: "Mathison",
//     last: "Turing",
//     born: 1912
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });
class Data {
    constructor (about, imgurl ) {
        this.about = about;
        this.imgurl = imgurl;
    
    }
    toString() {
        return this.about + " " + this.imgurl;
    }
}

    // Firestore data converter
  dataConverter = {
      toFirestore: function(data) {
          return {
              about: data.about,
              imgurl: data.imgurl
              }
      },
      fromFirestore: function(snapshot, options){
          const data = snapshot.data(options);
          return new Data(data.about, data.imgurl)
      }
  }
db.collection("data").doc("DGarApylkc5ys3c5CchN").withConverter(dataConverter).get().then(function(doc) {
    if (doc.exists){
        $('.about-text').text(doc.data().about);
        $('.about-img').attr("src", doc.data().imgurl);
        //  data = doc.data();       
        //  console.log(data.toString());
    }
});



$('#form-submit').on('click', function(e) {
    // alert("Hii");
    e.preventDefault();
    var iname, iemail, imessage;
    iname = $('#name').val();
    iemail = $('#email').val();
    imessage = $('#message').val();

    db.collection("messages").add({
        name: iname,
        email: iemail,
        message: imessage
    })
    .then(function(docRef) {
        // console.log("Document written with ID: ", docRef.id);
        $('#name').val('');
        $('#email').val('');
        $('#message').val('');
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});

$('.subscribe__btn').on('click', function(e) {
    e.preventDefault();

    var email = $('.subscribe__input').val();

    db.collection("subscribe").add({
        email: email
    })
    .then(function(docRef) {
        // console.log("Document written with ID: ", docRef.id);
        $('.subscribe__input').val('');
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});