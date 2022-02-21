const { Schema, model, Types } = require("mongoose");

const ReactionSchema = new Schema(
   {
      reactionId: {
         type: Schema.Types.ObjectId,
         default: () => new Types.ObjectId(),
      },
      reactionBody: {
         type: String,
         required: true,
         trim: true,
         maxLength: 280,
      },
      username: {
         type: String,
         required: true,
         trim: true,
      },
      createdAt: {
         type: Date,
         default: Date.now,
      },
   },
   {
      toJSON: {
         getters: true,
      },
      id: false,
   }
);

const ThoughtSchema = new Schema(
   {
      thoughtText: {
         type: String,
         required: true,
         trim: true,
         minLength: 1,
         maxLength: 280,
      },
      createdAt: {
         type: Date,
         default: Date.now,
      },
      username: {
         type: String,
         required: true,
         trim: true,
      },
      reactions: [ReactionSchema],
   },
   {
      toJSON: {
         virtuals: true,
         getters: true,
      },
      id: false,
   }
);

// get total count of friends on retrieval
ThoughtSchema.virtual("reactionCount").get(function () {
   return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model("Thought", ThoughtSchema);

// export the Thought model
module.exports = Thought;
