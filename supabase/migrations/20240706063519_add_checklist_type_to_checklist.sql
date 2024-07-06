ALTER TABLE checklists
ADD COLUMN checklist_type VARCHAR(20);

UPDATE checklists
SET checklist_type = 'teacher'
WHERE checklist_type IS NULL;

ALTER TABLE checklists
ALTER COLUMN checklist_type SET NOT NULL;

ALTER TABLE checklists
ADD CONSTRAINT check_checklist_type 
CHECK (checklist_type IN ('teacher', 'student'));

CREATE INDEX idx_checklists_type ON checklists(checklist_type);

