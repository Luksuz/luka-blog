import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Content from "./components/Content";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const background = "linear-gradient(to right, #A1CCD1, #F4F2DE)";

function App() {
  const [activeTab, setActiveTab] = useState("Hello World!");
  const [postsData, setPostsData] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const fetchPostsData = async () => {
    try {
      const response = await fetch("https://blog-394814.ew.r.appspot.com/blog/getPosts");
      const data = await response.json();
      setPostsData(data);
    } catch (error) {
      console.error("Error fetching posts data:", error);
    }
  };
  fetchPostsData();

  const filteredData = postsData.filter((item) => item.title === activeTab);

  const mappedContent = filteredData.map((item) => { 

    const createdAtDate = new Date(item.createdAt);
    const monthNumber = createdAtDate.getUTCMonth();
    const monthName = monthNames[monthNumber];

    const year = createdAtDate.getUTCFullYear();
    let day = createdAtDate.getUTCDate();
    const hour = createdAtDate.getUTCHours();
    const minute = createdAtDate.getUTCMinutes();

    if(day === 1){
      day = day + "st";
    }
    else if(day === 2){
      day = day + "nd";
    }
    else if(day === 3){
      day = day + "rd";
    }
    else{
      day = day + "th";
    }
    const formattedCreatedAt = `${monthName} ${day.toString().padStart(2, '0')} ${year}. at ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  
  return (
    <Content
      key={item.title}
      title={item.title}
      subtitle1={item.subtitle1}
      content1={item.content1}
      subtitle2={item.subtitle2}
      content2={item.content2}
      subtitle3={item.subtitle3}
      content3={item.content3}
      subtitle4={item.subtitle4}
      content4={item.content4}
      subtitle5={item.subtitle5}
      content5={item.content5}
      images={item.images}
      createdAt={formattedCreatedAt}
    />
  )});

  const mappedTabs = postsData.map((item) => (
    <Nav.Item key={item.title} className="border rounded rounded">
      <Nav.Link
        eventKey={item.title}
        title={item.title}
        className="border-0 text-start"
      >
        {item.title}
      </Nav.Link>
    </Nav.Item>
  ));

  return (
    <>
      <div className="" style={{ background }}>
        <div className="d-flex justify-content-between">
          <h1 className="text-4xl font-bold p-2">Luka Minđek</h1>
          {/* Navbar for mobile screens */}
          <Navbar
            expand="sm"
            className="d-flex d-sm-none justify-content-end position-absolute w-100"
            onSelect={handleTabChange}
          >
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              onClick={handleMobileMenuToggle}
            />
            <Navbar.Collapse>
              <Nav className="flex-column bg-light">{mappedTabs}</Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <hr />
        <div className="d-flex row">
          <div className="col-3 mt-3">
            {/* Sidebar for larger screens */}
            <Nav
              id="controlled-tab-example"
              activeKey={activeTab}
              onSelect={handleTabChange}
              className="flex-column d-none d-sm-block"
            >
              {mappedTabs}
            </Nav>
          </div>
          <div className="col-12 col-sm-9">{mappedContent}</div>
        </div>
      </div>
    </>
  );
}

export default App;