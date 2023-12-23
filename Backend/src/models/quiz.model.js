import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    qno:{ type: Number, required: true, unique: true },
    qtext:{ type: String, required: true },
    options:[
        {
            point: { type: Number, required: true },
            text: { type: String, required: true }
        }       
    ],
})

const quizSchema = mongoose.Schema({
    category:{ type: String, required: true },
    questions:[questionSchema],
    source:{type:String},
    
},{timestamps:true})

// Pre-save hook to automatically assign question numbers
quizSchema.pre("save",  function (next){
    // If questions array is empty or not provided, nothing to do
    if(!this.questions || this.questions.length == 0){
        return next()
    }
    
    // Assign question numbers starting from 1 and hardcode options for each question
    this.questions.forEach((question,index) => {
        question.qno = index + 1;
        question.options = [
            { point: 0, text: 'Not at all' },
            { point: 1, text: 'Several days' },
            { point: 2, text: 'More than half the days' },
            { point: 3, text: 'Nearly every day' }
        ];
    });
    return next();

})

const  Quiz = mongoose.model("Quiz",quizSchema)

const resultSchema = mongoose.Schema({
  category: { type: String, required: true },
  results: [
    {range: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    diagnosis: { type: String, required: true },
    recommendation: { type: String, required: true }
    }
  ]
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);

export  {Quiz,Result}


// for anxiety
// {
//   "category": "Anxiety",
//   "questions": [
//     {
//       "qno": 1,
//       "qtext": "Feeling nervous, anxious, or on edge",
//       "options": [
//         { "point": 0, "text": "Not at all" },
//         { "point": 1, "text": "Several days" },
//         { "point": 2, "text": "More than half the days" },
//         { "point": 3, "text": "Nearly every day" }
//       ]
//     },
//     {
//       "qno": 2,
//       "qtext": "Not being able to stop or control worrying",
//       "options": [
//         { "point": 0, "text": "Not at all" },
//         { "point": 1, "text": "Several days" },
//         { "point": 2, "text": "More than half the days" },
//         { "point": 3, "text": "Nearly every day" }
//       ]
//     },
//     {
//       "qno": 3,
//       "qtext": "Worrying too much about different things",
//       "options": [
//         { "point": 0, "text": "Not at all" },
//         { "point": 1, "text": "Several days" },
//         { "point": 2, "text": "More than half the days" },
//         { "point": 3, "text": "Nearly every day" }
//       ]
//     },
//     {
//       "qno": 4,
//       "qtext": "Trouble relaxing",
//       "options": [
//         { "point": 0, "text": "Not at all" },
//         { "point": 1, "text": "Several days" },
//         { "point": 2, "text": "More than half the days" },
//         { "point": 3, "text": "Nearly every day" }
//       ]
//     },
//     {
//       "qno": 5,
//       "qtext": "Being so restless that it's hard to sit still",
//       "options": [
//         { "point": 0, "text": "Not at all" },
//         { "point": 1, "text": "Several days" },
//         { "point": 2, "text": "More than half the days" },
//         { "point": 3, "text": "Nearly every day" }
//       ]
//     },
//     {
//       "qno": 6,
//       "qtext": "Becoming easily annoyed or irritable",
//       "options": [
//         { "point": 0, "text": "Not at all" },
//         { "point": 1, "text": "Several days" },
//         { "point": 2, "text": "More than half the days" },
//         { "point": 3, "text": "Nearly every day" }
//       ]
//     },
//     {
//       "qno": 7,
//       "qtext": "Feeling afraid, as if something awful might happen",
//       "options": [
//         { "point": 0, "text": "Not at all" },
//         { "point": 1, "text": "Several days" },
//         { "point": 2, "text": "More than half the days" },
//         { "point": 3, "text": "Nearly every day" }
//       ]
//     }
//   ],
//   "source": "GAD-7 Generalized Anxiety Disorder (GAD-7) © Pfizer Inc. All rights reserved. Reproduced with permission.",
//   "results": [
//     { "range": "0-4", "diagnosis": "Minimal Anxiety", "recommendation": "Continue engaging in activities that bring you joy and well-being. Explore the website's resources for mental well-being." },
//     { "range": "5-9", "diagnosis": "Mild Anxiety", "recommendation": "Connect with the AI chatbot for emotional support. Explore the blog section for articles on managing mild anxiety. Consider scheduling a session with a therapist through the website to discuss your feelings in more detail." },
//     { "range": "10-14", "diagnosis": "Moderate Anxiety", "recommendation": "Schedule a therapy session with a qualified professional through the website. The AI chatbot can provide immediate support, and attending live sessions by mental health experts can offer additional insights. Explore the website's resources for coping mechanisms and self-help techniques." },
//     { "range": "15-21", "diagnosis": "Severe Anxiety", "recommendation": "Urgently schedule a session with a therapist through the website. The AI chatbot can provide immediate support and guidance. Consider attending live sessions and workshops to gain a deeper understanding of your mental health. Engage in the website's community forums for peer support." }
//   ]
// }
