// import course ressources
const Course = require("../modules/Ressources.Course/Course.js");
const CourseService = require("../modules/Ressources.Course/CourseService.js");

// import passport
//var passport = require('../../config/passport');

//import ErrorObject
const ErrorObject = require("../modules/error/ErrorObject.js");

module.exports = (app) => {
  var courseService = new CourseService();

  //Get all course
  app.get("/course", (req, res) => {
    courseService.SELECT({}, (courses) => {
      if (!courses) {
        res.status(406).end();
        return;
      } else {
        let results = [];
        courses.forEach((item) => {
          results.push(item.toObject(true, true, true));
        });
        res.status(200).json({ courses: results });
      }
    });
  });

  function changeHyphenatedWords(input) {
    return input.replace(/\b([a-zA-Z]+)-([a-zA-Z]+)\b/g, (match, p1, p2) => {
      return `${p1.charAt(0).toUpperCase() + p1.slice(1)} ${
        p2.charAt(0).toUpperCase() + p2.slice(1)
      }`;
    });
  }

  //Get a course from its title
  app.get("/course/:title", (req, res) => {
    console.log(changeHyphenatedWords(req.params.title).toUpperCase());
    let criteria = {
      course_title: changeHyphenatedWords(req.params.title).toUpperCase(),
    };
    courseService.SELECT(criteria, (courses) => {
      if (!courses) {
        res.status(406).end();
        return;
      } else {
        let results = [];
        courses.forEach((item) => {
          console.log("Item here", item);
          results.push(item.toObject(true, true, true));
        });
        res.status(200).json({ courses: results });
      }
    });
  });

  //Add a course
  app.post("/course", (req, res) => {
    let bodyNewCourse = new Course(null, null, req.body);
    courseService.INSERT(bodyNewCourse, (newCourse) => {
      console.log(newCourse);
      if (newCourse.code) {
        res.statusMessage = newCourse.errorMessage;
        res.status(newCourse.code).end();
        return;
      } else {
        res.status(200).json({ course: newCourse });
      }
    });
  });

  //Modify a course
  app.put("/course/:id", (req, res) => {
    let course = {
      course_id: req.params.id,
      course_title: req.body.course_title,
      course_image: req.body.course_image,
      course_data: req.body.course_data,
      course_item: req.body.course_item,
    };
    console.log(req.body);
    courseService.UPDATE(course, (courses) => {
      if (!courses) {
        res.status(406).end();
        return;
      } else {
        //let results = [];
        //courses.forEach(item => { results.push(item.toObject(true, true, true));})
        res.status(200).json({ courses: courses });
      }
    });
  });

  // Delete a course
  app.delete("/course/:id", (req, res) => {
    let course = {
      course_id: req.params.id,
    };
    courseService.DELETE(course, (courses) => {
      res.status(200).json({ courses: courses });
    });
  });
};
