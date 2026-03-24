import { SubjectRepository } from './src/modules/subjects/subject.repository';
import { pool } from './src/config/db';

async function test() {
  const repo = new SubjectRepository();
  try {
    const subjects = await repo.getSubjects();
    console.log('Total Subjects:', subjects.length);
    console.log('Sample Subject:', JSON.stringify(subjects[0], null, 2));
    await pool.end();
  } catch (err) {
    console.error('Test Error:', err);
  }
}
test();
