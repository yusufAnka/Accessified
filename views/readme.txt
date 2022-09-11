- Create a layout.ejs
    menuvar.ejs

    footer code

     <h3><a href="/users/setAlgorithm"> Set Algorithm</a></h3>
        <h3><a href="/users/setExam"> Set Exam </a></h3>
        <h3><a href="/users/markExam"> Mark Exam </a></h3>
        <h3><a href="/users/viewResult"> View Results </a></h3>
        <h3>Add Student</h3>
        <h3>Delete Student</h3> 

        student dash momoh
    <div class="wrapper">
  <div class="top_navbar">
    <div class="hamburger">
       <div class="hamburger__inner">
         <div class="one"></div>
         <div class="two"></div>
         <div class="three"></div>
       </div>
    </div>
    <div class="menu">
      <div class="logo">
        Assessified
      </div>
      <!-- right menu removed-->
    </div>
  </div>
    
  <div class="main_container">
      <div class="sidebar">
          <div class="sidebar__inner">
            <div class="profile">
              <div class="img">
                <img src="/linkedin.png" alt="profile_pic">
              </div>
              <div class="profile_info">
                 <p>Welcome</p>
                 <p class="profile_name"><%= user.name %></p>
              </div>
            </div>
            <ul>
              <li>
                <a href="#" class="active">
                  <span class="icon"><i class="fas fa-dice-d6"></i></span>
                  <span class="title">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/users/selectAlgorithm">
                  <span class="icon"><i class="fab fa-delicious"></i></span>
                  <span class="title">Take Algorithms</span>
                </a>
              </li>
              <li>
                <a href="/users/selectExam">
                  <span class="icon"><i class="fab fa-elementor"></i></span>
                  <span class="title">Take Exam</span>
                </a>
              </li>
              <li>
                <a href="/users/viewResult">
                  <span class="icon"><i class="fas fa-chart-pie"></i></span>
                  <span class="title">View Results</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span class="icon"><i class="fas fa-border-all"></i></span>
                  <span class="title">Others...</span>
                </a>
              </li>
            </ul>
          </div>
      </div>



      
      <div class="container">
        <div class="item">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab a nesciunt doloribus. Explicabo minus cumque, molestiae tempore repellendus iusto enim maiores pariatur officiis perferendis excepturi, ut dolore laborum eligendi laudantium placeat aspernatur! Quos dolorum unde officiis labore est animi excepturi neque, provident, inventore nobis expedita facilis aspernatur, nihil in atque?
        </div>
 
      </div>
  </div>
  
</div>	
*{
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
}

.wrapper{
  width: 100%;
  height: 100%;
}

.top_navbar{
  background: #a87777;
  height: 60px;
  display: flex;
  position: fixed;
  width: 100%;
  top: 0;
}

.top_navbar .hamburger{
  width: 80px;
  background: #2f0a0a;
  position: relative;
  font-size: 28px;
}

.top_navbar .hamburger .hamburger__inner{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  cursor: pointer;
  width: 40px;
  height: 20px;
}

.top_navbar .hamburger__inner > div{
  width: 30px;
  height: 2px;
  background: #cfbfbf;
  position: absolute;
  top: 0;
  left: 0;
}

.top_navbar .hamburger div.two{
  top: 10px;
  width: 40px;
}

.top_navbar .hamburger div.three{
  top: 20px;
}

.top_navbar .menu{
  width: calc(100% - 80px);
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.top_navbar .menu .logo{
  color: orange;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.top_navbar .menu .right_menu ul{
  display: flex;
}

.top_navbar .menu .right_menu ul li{
  position: relative;
}

.top_navbar .menu .right_menu ul li .fas{
  font-size: 22px;
  cursor: pointer;
  color: #004D40;
}

.top_navbar .menu .right_menu ul li .profile_dd{
  position: absolute;
  top: 35px;
  right: -10px;
  background: #cfbfbf;
  box-shadow: 0 0 2px rgba(0,0,0,0.5);
  padding: 10px 0;
  width: 180px;
  border-radius: 3px;
  display: none;
  user-select: none;
}

.top_navbar .menu .right_menu ul li .profile_dd.active{
  display: block;
}

.top_navbar .menu .right_menu ul li .profile_dd .dd_item{
  padding: 10px;
  cursor: pointer;
  color: #004D40;
}

.top_navbar .menu .right_menu ul li .profile_dd .dd_item:hover{
  background: #E0F2F1;
}

.top_navbar .menu .right_menu ul li .profile_dd:before{
  content: "";
  position: absolute;
  top: -20px;
  right: 10px;
  border: 10px solid;
  border-color: transparent transparent #fff transparent;
}

.main_container .sidebar{
  position: fixed;
  top: 60px;
  left: 0;
  width: 225px;
  height: 100%;
  background: #2f0a0a;
  transition: all 0.3s ease;
}

/* #6b4141 */

.main_container .sidebar .sidebar__inner{
  position: relative;
}

.main_container .sidebar .profile{
  display: flex;
  align-items: center;
  color: #cfbfbf;
  padding: 20px 0;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.main_container .sidebar .profile .img{
  padding: 0 18px;
}

.main_container .sidebar .profile img{
   width: 45px;
}

.main_container .sidebar .profile p:first-child{
  font-size: 14px;
  color: orange;
  margin-bottom: 3px;
}

.main_container .container{
  margin-top: 60px;
  width: calc(100% - 225px);
  margin-left: 225px;
  padding: 30px;
  transition: all 0.3s ease;
}

.main_container .sidebar ul li a{
  color: #cfbfbf;
  font-size: 18px;
  padding: 20px 30px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin-bottom: 1px;
  transition: all 0.3s ease;
}

.main_container .sidebar ul li a .icon{
  margin-right: 15px;
  font-size: 28px;
}

.main_container .sidebar ul li a span{
  display: inline-block;
}

.main_container .sidebar ul li a:hover,
.main_container .sidebar ul li a.active{
  background: #fff;
  color: #004D40;
}

.main_container .container .item{
  background: #fff;
  border: 1px solid #E0F2F1;
  margin-bottom: 30px;
  padding: 20px;
  font-size: 14px;
  line-height: 22px;
}

/* after adding active class */
.wrapper.active .sidebar{
  width: 80px;
}

.wrapper.active .sidebar ul li a span.title,
.wrapper.active .profile_info
{
  display: none;
}

.wrapper.active .main_container .container{
  width: calc(100% - 80px);
  margin-left: 80px;
}

 <nav class="navbar navbar-expand-sm navbar-light">
        <a href="/" class="navbar-brand">Assessified</a>
    
        <ul class="navbar-nav">
            <li class="nav-list"><a href="/setexams">Set Question</a></li>
        </ul>
    </nav>