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
