import React from 'react';
import styles from "./index.module.css";

const reviews = [
  {
    name: "Maria Khan",
    username: "@mariakhan",
    image: "https://www.lensmen.ie/wp-content/uploads/2015/02/Profile-Portrait-Photographer-in-Dublin-Ireland.-1030x1030.jpg",
    comment: "Soul Support has been a game-changer for me. The resources on mental health are incredibly helpful. I feel supported and understood on my journey."
  },
  {
    name: "Romaisa Ahmed",
    username: "@romaisaAhmed",
    image: "https://charlotteknee.com/photography/wp-content/uploads/2015/04/Professional-Profile-Photograph-Corporate-Headshot-copyright-Charlotte-Knee-Photography_00011.jpg",
    comment: "Finding Soul Support was like discovering a lifeline. The online counseling feature has allowed me to connect with a licensed therapist conveniently from my home."
  },
  {
    name: "Huzaifa Haneef",
    username: "@huzaifaHaneef",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGSc5W4dcZMB_3lyj68DoZvjqzNMmwhb_F0Q&usqp=CAU",
    comment: "I'm grateful for the self-assessment tool on Soul Support. It helped me gain insights into my mental health and guided me towards appropriate help."
  },
  {
    name: "Sarah Johnson",
    username: "@sarahjohnson",
    image: "https://www.w3schools.com/howto/img_avatar.png",
    comment: "The meditation guides on Soul Support have helped me manage my anxiety and find peace. I appreciate the variety of resources available."
  },
  {
    name: "Ayesha Siddiqui",
    username: "@ayeshaSiddiqui",
    image: "https://www.w3schools.com/w3images/avatar2.png",
    comment: "Soul Support's articles are so informative and relatable. I've learned a lot about mental health and how to take care of myself better."
  },
  {
    name: "David Brown",
    username: "@davidbrown",
    image: "https://www.w3schools.com/w3images/avatar6.png",
    comment: "The community forums on Soul Support have connected me with people who understand what I'm going through. It's comforting to know I'm not alone."
  },
  {
    name: "Fatima Ali",
    username: "@fatimaAli",
    image: "https://www.w3schools.com/w3images/avatar5.png",
    comment: "Soul Support's therapy matching service helped me find a therapist who truly gets me. It's been a turning point in my mental health journey."
  },
  {
    name: "John Smith",
    username: "@johnsmith",
    image: "https://www.w3schools.com/w3images/avatar3.png",
    comment: "I love the mental health quizzes on Soul Support. They are a fun way to learn more about myself and my mental health."
  },
  {
    name: "Sara Zafar",
    username: "@sarazafar",
    image: "https://www.w3schools.com/w3images/avatar4.png",
    comment: "The blog section on Soul Support is fantastic. The tips and advice have helped me develop better coping strategies."
  },
  {
    name: "Michael Williams",
    username: "@michaelwilliams",
    image: "https://www.w3schools.com/howto/img_avatar2.png",
    comment: "Soul Support has made mental health care more accessible to me. The online sessions are convenient and effective."
  },
  {
    name: "Mehreen Qureshi",
    username: "@mehreenQureshi",
    image: "https://www.w3schools.com/w3images/avatar6.png",
    comment: "The resources on Soul Support are top-notch. I appreciate the quality and depth of the information provided."
  },
  {
    name: "Christopher Johnson",
    username: "@chrisjohnson",
    image: "https://www.w3schools.com/w3images/avatar2.png",
    comment: "The self-help guides on Soul Support have empowered me to take control of my mental health. I've seen real improvements in my life."
  },
  {
    name: "Nida Malik",
    username: "@nidamalik",
    image: "https://www.w3schools.com/w3images/avatar5.png",
    comment: "Soul Support's online therapy sessions are a blessing. I can easily schedule sessions that fit my busy life."
  },
  {
    name: "James Miller",
    username: "@jamesmiller",
    image: "https://www.w3schools.com/howto/img_avatar.png",
    comment: "The peer support groups on Soul Support have been a great source of encouragement and understanding."
  },
  {
    name: "Rabia Shah",
    username: "@rabiashah",
    image: "https://www.w3schools.com/w3images/avatar4.png",
    comment: "I appreciate the diverse range of topics covered on Soul Support. There's something for everyone, no matter what you're going through."
  },
  {
    name: "Olivia Martin",
    username: "@oliviamartin",
    image: "https://www.w3schools.com/w3images/avatar3.png",
    comment: "Soul Support's mobile app is very user-friendly. I can access all the resources I need anytime, anywhere."
  },
  {
    name: "Bilal Khan",
    username: "@bilalkhan",
    image: "https://www.w3schools.com/w3images/avatar6.png",
    comment: "The meditation guides on Soul Support have become a part of my daily routine. They've helped me find a sense of calm and focus."
  }
];



function Reviews() {
  return (
    <>
      <div className={styles.reviews} id="review">
        <div className={styles.heading}>
          <h1 className='mb-4'>Our Happy Clients!</h1>
          <h2>
             More Than 1000 Clients Rated
          </h2>
          <img className={styles.starimg} src="/images/star2.png" />
        </div>
        <div className={styles.slider}>
          <div className={styles.fullBoxer}>
            {reviews.map((review, index) => (
              <div className={styles.commentBox} key={index}>
                <div className={styles.boxTop}>
                  <div className={styles.Profile}>
                    <div className={styles.profileIImage}>
                      <img src={review.image} />
                    </div>
                    <div className={styles.Name}>
                      <strong>{review.name}</strong>
                      <span>{review.username}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.comment}>
                  <p>{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Reviews;
