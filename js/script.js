
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
