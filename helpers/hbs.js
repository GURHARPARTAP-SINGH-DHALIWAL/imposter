const moment=require('moment');
module.exports={
    formatDate:function(date,format)
    {
        return moment(date).format(format);
    },
    // truncate text
    truncate: function (str, len) 
    {
        if (str.length > len && str.length > 0) {
          let new_str = str + ' '
          new_str = str.substr(0, len)
        //   dont; let incomplete words out there so get lastindex of space and truncate it till there 
          new_str = str.substr(0, new_str.lastIndexOf(' '))
          new_str = new_str.length > 0 ? new_str : str.substr(0, len)
          return new_str + '...'
        }
        return str
      },
    //   remove p tagse given by ckeditor some regular expression in don't understand much (actually not at all lol) refer-https://www.geeksforgeeks.org/how-to-strip-out-html-tags-from-a-string-using-javascript/#:~:text=To%20strip%20out%20all%20the,innerText%20property%20from%20HTML%20DOM.
      stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '')
      },
    //   basically put a edit icon on logged in user posts and clicking it obviously redirects to edit handler
      editIcon: function (storyUser, loggedUser, storyId, floating = true) {
        if (storyUser._id.toString() == loggedUser._id.toString()) {
          if (floating) {
            return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue waves-effect"><i class="fas fa-edit fa-small"></i></a>`
          } else {
            return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
          }
        } else {
          return ''
        }
      },

//     two select a given value for select tag which is given by selected
      select: function (selected, options) {
        //   it sets selected on selected parameter out of the given options
        return options
          .fn(this)
          .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
          )
          .replace(
            new RegExp('>' + selected + '</option>'),
            ' selected="selected"$&'
          )
      },
}