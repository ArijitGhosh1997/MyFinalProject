class controller {
    /**
     * @Method showIndex
     * @Description To Show The Index
    */
    async showIndex(req,res){
            res.render('user/index',{
                title:"index page",
                data:req.user
            })
       
    }
    /*
     * @Method showContact
     * @Description To Show The contact
    */
    async showContact(req,res){

            res.render('user/contact',{
                title:"contact page",
                data:req.user
            })
    }
    /*
     * @Method showAbout
     * @Description To Show The about
    */
    async showAbout(req,res){
        res.render('user/about',{
            title:"about page",
            data:req.user
        })
    }
    /*
     * @Method showCourses
     * @Description To Show The Courses
    */
    async showCourses(req,res){
        res.render('user/courses',{
            title:"courses page",
            data:req.user
        })
    }
    /**
     * @Method showcourseDetails
     * @Description To Show The Courses-Details
    */
    async showcourseDetails(req,res){
        res.render('user/course-details',{
            title:"showcourseDetails page",
            data:req.user
        })
    }
    /**
     * @Method showTrainers
     * @Description To Show The Trainers
    */
    async showTrainers(req,res){
        res.render('user/trainers',{
            title:"trainers page",
            data:req.user
        })
    }
    /**
     * @Method showEvents
     * @Description To Show The Events
    */
    async showEvents(req,res){
        res.render('user/events',{
            title:"events page",
            data:req.user
        })
    }
}
module.exports = new controller();