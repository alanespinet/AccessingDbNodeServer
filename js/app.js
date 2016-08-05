var arr_status = ['new', 'started', 'completed'];
var news, started, completed;

function loadData(){
  $(".col").html("");

  $.ajax({
      url: "http://localhost:9999/user_status/new",
      success: function(res, txt, xhr){
        news = res;
        var table_values = "<table><tr> <th>Id</th> <th>Description</th> <th>User Id</th> <th>Change status</th></tr>";
        for(var n in news){
          table_values += "<tr>";
            var task_id = news[n]["id"];
            table_values += `<td>${news[n]["id"]}</td><td>${news[n]["description"]}</td><td>${news[n]["user_id"]}</td> <td><button class="start_button" recordId="${task_id}">Start!</button></td>`;
          table_values += "</tr>";
        }
        table_values += "</table>";
        $(".news").append(table_values);
      },
      method: "get"
  });

  $.ajax({
    url: "http://localhost:9999/user_status/started",
    success: function(res, txt, xhr){
      started = res;
      var table_values = "<table><tr class='firstRow'> <th>Id</th> <th>Description</th> <th>User Id</th> <th>Change status</th></tr>";
      for(var s in started){
        table_values += "<tr>";
          var task_id = started[s]["id"];
          table_values += `<td>${started[s]["id"]}</td><td>${started[s]["description"]}</td><td>${started[s]["user_id"]}</td> <td><button class="start_button" recordId="${task_id}">Complete!</button></td>`;
        table_values += "</tr>";
      }
      table_values += "</table>";
      $(".started").append(table_values);
    },
    method: "get"
  });

  $.ajax({
      url: "http://localhost:9999/user_status/completed",
      success: function(res, txt, xhr){
        completed = res;
        var table_values = "<table><tr> <th>Id</th> <th>Description</th> <th>User Id</th> <th>Change status</th></tr>";
        for(var c in completed){
          table_values += "<tr>";
            var task_id = completed[c]["id"];
            table_values += `<td>${completed[c]["id"]}</td><td>${completed[c]["description"]}</td><td>${completed[c]["user_id"]}</td> <td><button class="start_button" recordId="${task_id}">Delete!</button></td>`;
          table_values += "</tr>";
        }
        table_values += "</table>";
        $(".completed").append(table_values);
      },
      method: "get"
  });
}

loadData();

$('.news').on('click', 'button', function(){
  $.ajax({
    url: `http://localhost:9999/update_task/${$(this).attr('recordId')}/started`,
    sucess: function(res, txt, xhr) {

    },
    complete: function(jqxhr, jqtxt){
      loadData();
    },
    method: "put"
  });
});

$('.started').on('click', 'button', function(){
  $.ajax({
    url: `http://localhost:9999/update_task/${$(this).attr('recordId')}/completed`,
    sucess: function(res, txt, xhr) {

    },
    complete: function(jqxhr, jqtxt){
      loadData();
    },
    method: "put"
  });
});

$('.completed').on('click', 'button', function(){
  if(confirm('Are you sure?'))
  {
    $.ajax({
      url: `http://localhost:9999/delete/${$(this).attr('recordId')}`,
      sucess: function(res, txt, xhr) {

      },
      complete: function(jqxhr, jqtxt){
        loadData();
      },
      method: "put"
    });
  }
});

$('#show-create-task').on('click', function(){
  $('#create-task-form').css('display', 'block');

  $("#txt-description").val("");
  $("#txt-user_id").val("");
});

$('#btn-create').on('click', function(){
  var desc = $("#txt-description").val();
  var user = $("#txt-user_id").val();

  if(desc == "" || user == "") {
    alert('please provide some valid data. NO field can be blank');
    return;
  }

  var ajax_url = `http://localhost:9999/tasks/${desc}/${user}/new`;

  $.ajax({
	   url: ajax_url,
	    success: function(res, txt, xhr) {
		    console.log(res);
	    },
      complete: function(jqxhr, jqtxt){
        loadData();
      },
	    method: "post"
  });

  $('#create-task-form').css('display', 'none');
});

$('#btn-cancel').on('click', function(){
  alert('creation canceled');
  $('#create-task-form').css('display', 'none');
});
