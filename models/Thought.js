const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: date => dateFormat(date)
        }
    },
    {
        toJson: {
            getters: true
        },
        id: false
    }
)

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: date => dateFormat(date)
    },
    username: {
        type: String,
        require: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJson: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);
const Reaction = model("Reaction", reactionSchema);

module.exports = { Thought, Reaction }
