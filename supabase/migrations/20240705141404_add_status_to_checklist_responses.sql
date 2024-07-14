-- Add status column to checklist_responses table
ALTER TABLE checklist_responses ADD COLUMN status checklist_status DEFAULT 'draft';