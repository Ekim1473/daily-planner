const workhours = [];
$(document).ready(function () {

  //creating the hour divs

  CalanderUtilities.createCalanderList(workhours);

  $('#dvCalanderContainer').on('click', '.saveBtn', function () {
    var index = $(this).attr('index');
    var comment = $(this).parent().closest('.row').find('textarea').val();
    workhours[index].comment = comment;
    localStorage.setItem('calander', JSON.stringify(workhours));
  })
});

//populating the text content and styles.

CalanderUtilities = {
  createCalanderList: function (workHours) {
    var mainhtml = "";
    CalanderUtilities.GetAllHours();
    var calander = localStorage.getItem('calander');
    if (calander) {
      workHours = JSON.parse(calander);
    }
  
    //appending the content
    $.each(workHours, function (i, v) {
      mainhtml += `<div id="hour-9" class="row time-block past">
        <div class="col-2 col-md-1 hour text-center py-3">${v.time}</div>
        <textarea class="col-8 col-md-10 description ${v.class}" rows="3">${v.comment} </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save" index="${i}" btntype="saveRecord">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
        </div>`
    })
    $('#dvCalanderContainer').html(mainhtml);
  },

  //displaying the divs according to hours past,present and future.
  GetAllHours: function () {
    var presentHour = new Date().getHours();
    for (let hour = 7; hour < 18; hour++) {
      var actualTime = hour.length == 1 ? "0" + hour : hour;
      if (hour > 11) {
        actualTime = actualTime + ":00"
      } else {
        actualTime = actualTime + ":00"
      }
      var className = "future";
      if (hour < presentHour)
        className = "past"
      if (hour == presentHour)
        className = "present";

      workhours.push({
        time: actualTime,
        comment: "",
        class: className
      })
    }
  }
}





