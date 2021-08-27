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
      }
}