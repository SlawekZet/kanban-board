import mongoose from 'mongoose';

const SubtaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
});

const TaskSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    required: true,
  },
  subtasks: [SubtaskSchema],
});

const ColumnSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  tasks: [TaskSchema],
});

const BoardSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  columns: [ColumnSchema],
});

const KanbanSchema = new mongoose.Schema({
  boards: [BoardSchema],
});

const Kanban = mongoose.models.Kanban || mongoose.model('Kanban', KanbanSchema);
export default Kanban;
