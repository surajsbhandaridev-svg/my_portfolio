import mongoose, { Schema, Document } from 'mongoose';

export interface IJourneyContent extends Document {
  introduction: string;
  story: string;
  howIStarted: string;
  problemSolvingApproach: string;
  currentLearning: string;
  futureGoals: string;
  updatedAt: Date;
}

const JourneyContentSchema: Schema = new Schema(
  {
    introduction: {
      type: String,
      default:
        "I'm a Computer Science Engineering student passionate about software development, problem-solving, and building useful digital products. I enjoy exploring technologies, learning by building, and turning ideas into working solutions.",
    },
    story: {
      type: String,
      default:
        "My journey in engineering started with a simple curiosity: understanding how digital products work under the hood. From writing my first lines of C++ and Python to architecting real-time multiplayer systems and security scanners, every project has been a learning milestone.",
    },
    howIStarted: {
      type: String,
      default:
        "I began programming exploring fundamental algorithms and data structures, building small console utilities, and gradually expanding into full-stack web architectures, distributed systems, and real-time WebSockets.",
    },
    problemSolvingApproach: {
      type: String,
      default:
        "I believe in breaking problems down to their fundamental components. First understand the core constraints, design the data flow and system model, implement clean, testable code, and iterate with benchmarks.",
    },
    currentLearning: {
      type: String,
      default:
        "Currently diving deeper into Advanced Data Structures & Algorithms, distributed systems design, backend performance optimizations, and cloud infrastructure.",
    },
    futureGoals: {
      type: String,
      default:
        "Aspiring to engineer impactful software systems, contribute significantly to open-source developer tooling, and build resilient products used by thousands of people.",
    },
  },
  { timestamps: true }
);

export const JourneyContent = mongoose.model<IJourneyContent>('JourneyContent', JourneyContentSchema);
