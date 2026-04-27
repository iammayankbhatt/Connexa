import { db, auth } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getMyConnections } from './connectionService';

// Simple matching: find users who share skills/major/university
export async function getMatchSuggestions() {
  const user = auth.currentUser;
  if (!user) return [];

  const snap = await getDocs(collection(db, 'users'));
  const allUsers = snap.docs
    .map(d => ({ uid: d.id, ...d.data() }))
    .filter(u => u.uid !== user.uid);

  // Get own profile
  const meSnap = snap.docs.find(d => d.id === user.uid);
  const me = meSnap ? meSnap.data() : {};

  const mySkills = (me.skills || []).map(s => s.toLowerCase());
  const myMajor = (me.major || '').toLowerCase();
  const myUni = (me.university || '').toLowerCase();

  // Connected UIDs to exclude
  const connectedUids = await getMyConnections(user.uid);

  return allUsers
    .filter(u => !connectedUids.includes(u.uid))
    .map(u => {
      let score = 0;
      const theirSkills = (u.skills || []).map(s => s.toLowerCase());
      const sharedSkills = mySkills.filter(s => theirSkills.includes(s));
      score += sharedSkills.length * 3;
      if (u.major && u.major.toLowerCase() === myMajor) score += 2;
      if (u.university && u.university.toLowerCase() === myUni) score += 1;
      return { ...u, score, sharedSkills };
    })
    .sort((a, b) => b.score - a.score);
}
