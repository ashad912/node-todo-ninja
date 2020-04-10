//es6 version

$(document).ready(() => { //doc is ready

    $('form').on('submit', () => { //when form is submmitted
        const item = $('form input')
        const todo = {item: item.val()}
        console.log('post')

        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: (data) => {
                //do sth with the data via front-end framework
                location.reload()
            }
        })

        return false;
    })

    $('li').on('click', (e) => {
        const item = $(e.currentTarget).text().replace(/ /g, "-");
        console.log('delete')
        //in url we cannot have spaces beetwen words - have to hyphen replacement

        $.ajax({
            type: 'DELETE',
            url: '/todo/' + item,
            success: (data) => {
                //do sth with the data via front-end framework
                location.reload()
            }
        })
    })
})

/* es5 version
$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
*/