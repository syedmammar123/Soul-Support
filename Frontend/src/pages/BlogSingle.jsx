import axios from "axios";
import { useEffect, useState } from "react";
import { Link,  useNavigate,  useParams } from "react-router-dom";
import Navbar from "../components/Navbar";


const url = "https://img.freepik.com/free-photo/3d-render-medical-image-male-figure-with-brain-highlighted_1048-5873.jpg?w=740&t=st=1689418043~exp=1689418643~hmac=be14b5501fee079df99de9b77bb4cecaed4368d20487ba73c405f769b071f850"

const BlogSingle=()=>{
    const navigate = useNavigate()
    const [blog , setBlog] = useState([]);
    const { id } = useParams();

      var fake = [{
    blogid:1,
    blogtitle:"king",
    blogcontent:"adadadasd",
    img:"https://images.unsplash.com/photo-1560406146-78f8cb5e0fbe?q=80&w=1950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },{
    blogid:2,
    blogtitle:"king",
    blogcontent:"adadadasd",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsLXGyRaOxv5DrjguRH_gABl43f4H2VCzdsQ&usqp=CAU"
  },{
    blogid:3,
    blogtitle:"king",
    blogcontent:"adadadasd",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsLXGyRaOxv5DrjguRH_gABl43f4H2VCzdsQ&usqp=CAU"
  },{
    blogid:4,
    blogtitle:"king4",
    blogcontent:"adadadasd",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsLXGyRaOxv5DrjguRH_gABl43f4H2VCzdsQ&usqp=CAU"
  },]

    const fetchData = async () => {
      fake.map((item)=>{
        if(item.blogid == id){
          setBlog(item)
        }
      })

    //     try {
    // const res = await axios.get(`http://localhost:4000/blogs/${id}`);
    //       setBlog(res.data);
    //       console.log(res.data);
    //     } catch (err) {
    //       console.log(err);
    //     }
      }     
     
      const handleDelete = async () => {
        // try {
        //  await axios.delete(`http://localhost:4000/blogs/${id}`);
        //   navigate("/blogs");
        // } catch (err) {
        //   console.log(err);
        // }
      };


      useEffect(()=>{
        fetchData()
        },[]);

    return(
        <>
        <Navbar></Navbar>
        
        <div className="single">
            <div className="content1">
              <h1>{blog.blogtitle}</h1>
                <div className="contentImg">
                <img src={blog.img}></img>
                </div>
                <div className="user">
                    <img src={url}></img>
                    <div className="info">
                        <span>JHON</span>
                        {blog.publishdate && (
                        <p>{blog.publishdate}</p>
                         )}
                    </div>
                    <div className="edit">
                    <Link to={`/write?edit=${blog.blogid}` } state={blog}>
                    <button>Edit</button>
                    </Link>
                    <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            
                
                {/* <p>{blog.blogcontent}</p> */}
                <div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus deleniti, nulla ut optio similique qui eveniet deserunt iste velit quos explicabo tempora? Qui, unde natus facilis quas impedit doloremque reiciendis maiores id eos atque optio assumenda fugit quisquam pariatur nobis consequuntur maxime in mollitia. Placeat laboriosam mollitia a tempore ducimus aut provident saepe, impedit asperiores magni repellendus! Hic sed fugiat ducimus qui iusto suscipit quasi consectetur blanditiis exercitationem. Dolores doloribus qui optio, at quam, nobis exercitationem error iusto omnis minus nam quasi cupiditate totam, architecto necessitatibus. Quod blanditiis maxime doloremque possimus itaque, amet consectetur nesciunt dolor, reiciendis distinctio officiis porro? Excepturi mollitia repellendus aliquam asperiores nesciunt aspernatur fuga ex nemo laudantium maiores. Qui dolor vitae ducimus repellendus. Ducimus impedit eos, dignissimos architecto saepe, voluptatum sit, voluptates autem soluta error eaque! Sint adipisci aut aspernatur provident eligendi quisquam neque ipsam at. Reprehenderit nemo tempore itaque reiciendis. Obcaecati rem optio commodi exercitationem quam beatae nisi est velit dolores porro excepturi eius et doloribus, minima amet dignissimos fuga dolor alias. Nihil consequuntur nam sunt omnis modi necessitatibus, velit sed, cupiditate veniam ipsum tenetur autem nostrum similique suscipit quae iure exercitationem quasi vel fuga asperiores, dolorem ea. Recusandae quidem rerum laborum natus itaque soluta maiores sapiente tempora culpa minus incidunt ducimus molestias suscipit ipsum commodi aliquam quis pariatur omnis, iste officia! Necessitatibus, eaque fugiat dolorem accusamus sint minima! Sint esse voluptates laborum quidem hic temporibus, in eius a eaque architecto neque earum numquam commodi quo ipsam officia omnis ullam eum vitae molestiae, minus accusamus! Quidem nam libero, at eveniet ex veniam suscipit magni, est accusantium vel exercitationem dolores cumque. Natus culpa soluta, consequatur dolores iusto fugiat doloremque quas ducimus nesciunt cupiditate hic ad! Magni itaque beatae asperiores tempora enim aliquam perferendis quod ab recusandae inventore natus soluta quae facere animi, dolorum dolore suscipit ex eveniet nulla? Modi, velit. Praesentium facere est repellendus, mollitia ut omnis quae quisquam temporibus, nisi dignissimos quos corporis debitis vero esse tenetur sapiente id laborum doloremque. Odit placeat nostrum minus praesentium harum pariatur facere similique veritatis hic excepturi, doloribus assumenda a repudiandae soluta nihil nemo nesciunt aspernatur officiis asperiores molestias illo dignissimos doloremque? Aliquid ratione explicabo maiores consequuntur. At vel accusamus ab amet aperiam id veritatis repellat illum odit, aliquid similique, nemo doloremque atque, laborum aliquam minus corrupti. Voluptate repellendus fugiat beatae itaque aliquid. Dolore est qui nihil nemo accusantium voluptatum illum, numquam repellat rem facilis minus? Repudiandae sunt quaerat laboriosam recusandae tenetur eum rerum laborum dolore quisquam natus! Beatae, officiis. Veniam sequi aliquid numquam magnam dolorum expedita, incidunt delectus porro consequuntur ab. Reprehenderit laborum minus veritatis at, pariatur quae, accusamus error officiis exercitationem praesentium vero debitis quibusdam dolore voluptatem, amet sequi blanditiis consequuntur explicabo quam veniam sit molestias libero. Id enim laborum praesentium eius nisi optio vel velit, fugit minima laboriosam provident asperiores quas inventore odio repellendus ad quo aut quam dicta magnam totam voluptates delectus? Dignissimos nam officia provident, eum sequi quibusdam nesciunt aperiam rerum enim assumenda culpa dolorem accusantium hic? Facilis magnam hic quo esse enim commodi?Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, doloribus saepe tempora blanditiis possimus placeat accusantium itaque tenetur ratione, dolorum obcaecati nihil earum voluptatibus, officiis sunt natus reprehenderit ipsum. Minima iusto nemo in at, illo est asperiores necessitatibus fugit sapiente, sequi vitae quia mollitia nisi libero eaque quod nulla natus dolor aliquam explicabo expedita deserunt reprehenderit ab! Mollitia, repudiandae libero optio nobis deserunt vel aspernatur fugit, sunt inventore sit adipisci quas illum asperiores alias rem laboriosam consequuntur. Corporis amet cum veniam esse quam, magnam ea corrupti laboriosam nemo laudantium possimus quis dicta id odio perspiciatis beatae quos a rem? Quae omnis sed necessitatibus. Pariatur natus adipisci saepe distinctio! Nemo, voluptate nulla saepe adipisci eos magni aliquid maiores recusandae laudantium tempore, quam placeat, cumque dolorem ex eum veritatis suscipit. Sapiente, nobis quam aliquid consequuntur ea <br /><br />repellendus unde perspiciatis debitis officia. Similique nihil iste dolorem incidunt ratione maiores minima voluptates dicta ad, cum nobis earum at fugit nostrum! Eveniet impedit temporibus ut modi incidunt voluptatem, ab repellendus soluta totam dignissimos possimus maxime rerum maiores ducimus corrupti culpa, voluptatibus velit delectus. Ad accusamus minima facilis tenetur nisi, animi inventore molestias iusto. Ullam facere quam sapiente optio maxime molestias excepturi voluptas delectus veniam expedita, facilis veritatis quae dolore eligendi ea architecto saepe sequi quis aliquid. Doloremque nostrum deleniti quis vitae, quae, molestiae nemo sapiente iste laborum est, modi reprehenderit. Eligendi maiores harum voluptatibus fugit minus. Accusamus, aperiam repellat? Iusto facilis reiciendis nihil natus reprehenderit magnam eum laboriosam dignissimos adipisci totam incidunt ipsum, obcaecati dolorum harum neque odio provident sequi aliquam magni veniam nulla vitae cum illum? Quisquam eos, maxime mollitia neque inventore quo perferendis molestiae, dolorum, ipsam aut totam alias placeat facilis porro quis! Necessitatibus unde rerum in explicabo veniam<br /> Ea dolorem nulla laboriosam. Perspiciatis molestias cum cumque odit consequatur vel labore eveniet, distinctio vero debitis nesciunt aliquam libero, dolorem repellendus repellat tempore necessitatibus quisquam. Obcaecati laboriosam asperiores illum unde nulla nemo ullam sapiente commodi possimus facilis voluptatibus animi, nihil qui minus consequuntur doloribus nisi repellat doloremque, ab dolorem, dolor porro reprehenderit fugit. Rerum officiis quod optio necessitatibus voluptatibus praesentium doloremque porro delectus fugit voluptate laudantium, vel aperiam, dolorum beatae, repudiandae soluta hic possimus quidem qui nesciunt magnam in. At hic eligendi adipisci ex veritatis amet explicabo odio quo iusto, eaque in quas, fugit autem tenetur sint quam nemo modi blanditiis, sit commodi perspiciatis officiis fuga maiores! Tempore aspernatur sequi qui tenetur fugiat non soluta commodi iusto, distinctio quo sed, illum praesentium, nulla reiciendis quae ea deserunt incidunt sint aut! Magni, tenetur. Voluptatem fugiat dolore expedita amet provident minima saepe voluptate quis odio sequi, adipisci necessitatibus accusamus quas ducimus exercitationem nostrum explicabo cumque cupiditate eaque ipsum similique harum, sint praesentium <br /><br />laboriosam. Temporibus quisquam quibusdam nulla ex inventore perspiciatis laborum, qui nam. Quas magnam numquam excepturi repellendus atque, repudiandae optio quia suscipit id animi officiis eos temporibus repellat vitae perspiciatis ex modi consectetur quis! Quisquam ex nobis reiciendis reprehenderit voluptas, alias sed, necessitatibus accusantium consequuntur aut, fugit cum perferendis facere sunt doloremque molestias iure amet.</p>
                </div>

                <div className="user">
                    <img src={url}></img>
                    <div className="info">
                        <span>JHON</span>
                        {blog.publishdate && (
                        <p>{blog.publishdate}</p>
                         )}
                    </div>
                    <div className="edit">
                    <Link to={`/write?edit=${blog.blogid}` } state={blog}>
                    <button>Edit</button>
                    </Link>
                    <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>

                <div style={{display:"flex"}}>
                  <div  style={{width:"50%",height:"30vh",border:"1px solid red"}}> yaha or articale</div>
                  <div  style={{width:"50%",height:"30vh",border:"1px solid red"}}>articale</div>
                </div>
                <div style={{display:"flex"}}>
                  <div  style={{width:"50%",height:"30vh",border:"1px solid red"}}> yaha or articale</div>
                  <div  style={{width:"50%",height:"30vh",border:"1px solid red"}}>articale</div>
                </div>
                <div style={{display:"flex"}}>
                  <div  style={{width:"50%",height:"30vh",border:"1px solid red"}}> yaha or articale</div>
                  <div  style={{width:"50%",height:"30vh",border:"1px solid red"}}>articale</div>
                </div>

            </div>
            

        </div>
               <nav style={{backgroundColor:"bisque",width:"100%",height:"40px"}}>me footer</nav>

        </>
    )
}
export default BlogSingle;