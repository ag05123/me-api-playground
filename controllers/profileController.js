
const sequelize = require('../db');
const { QueryTypes } = require('sequelize');


function parseProfile(profile) {
  if (!profile) return null;
  try {
    profile.skills = JSON.parse(profile.skills || '[]');
    profile.projects = JSON.parse(profile.projects || '[]');
    profile.links = JSON.parse(profile.links || '{}');
  } catch (e) {
    console.error(`Error parsing JSON for profile ID ${profile.id}`, e);
    profile.skills = []; 
    profile.projects = [];
    profile.links = {};
  }
  return profile;
}


module.exports.createProfile = async (req, res) => {
  const data = req.body;
  try {
    const [insertId] = await sequelize.query(
      `INSERT INTO profiles (name, email, education, skills, projects, links) VALUES (?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          data.name || null,
          data.email || null,
          data.education || null,
          JSON.stringify(data.skills || []),
          JSON.stringify(data.projects || []),
          JSON.stringify(data.links || {})
        ],
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json({ insertedId: insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db_error', details: err.message });
  }
};


module.exports.getAllProfiles = async (req, res) => {
  try {
 
    const page = parseInt(req.query.page) || 1;
    const limit = 1; 
    const offset = (page - 1) * limit;

   
    const countResult = await sequelize.query(
      `SELECT COUNT(*) AS total FROM profiles`,
      { type: QueryTypes.SELECT }
    );
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

  
    const profiles = await sequelize.query(
      `SELECT * FROM profiles ORDER BY id ASC LIMIT :limit OFFSET :offset`,
      {
        replacements: { limit, offset },
        type: QueryTypes.SELECT
      }
    );
  console.log(profiles.map(parseProfile));
    res.json({
      page,
      totalPages,
      totalProfiles: total,
      data: profiles.map(parseProfile),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


module.exports.getProfileById = async (req, res) => {
  try {
    const profiles = await sequelize.query(
      `SELECT * FROM profiles WHERE id = ?`,
      {
        replacements: [req.params.id],
        type: QueryTypes.SELECT
      }
    );
    if (profiles.length === 0) return res.status(404).json({ error: 'not_found' });
    res.json(parseProfile(profiles[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


module.exports.updateProfile = async (req, res) => {
  const data = req.body;
  try {
    
    const [results, metadata] = await sequelize.query(
      `UPDATE profiles SET name = ?, email = ?, education = ?, skills = ?, projects = ?, links = ? WHERE id = ?`,
      {
        replacements: [
          data.name || null,
          data.email || null,
          data.education || null,
          JSON.stringify(data.skills || []),
          JSON.stringify(data.projects || []),
          JSON.stringify(data.links || {}),
          req.params.id
        ],
        type: QueryTypes.UPDATE
      }
    );
   
    if (metadata.changedRows === 0) return res.status(404).json({ error: 'not_found_or_no_change' });
    res.json({ updated: metadata.changedRows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db_error', details: err.message });
  }
};


module.exports.deleteProfile = async (req, res) => {
  try {
   
    const [results, metadata] = await sequelize.query(
      `DELETE FROM profiles WHERE id = ?`,
      {
        replacements: [req.params.id]
      }
    );
   
    if (metadata.affectedRows === 0) return res.status(404).json({ error: 'not_found' });
    res.status(200).json({ deleted: metadata.affectedRows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


module.exports.projectsBySkill = async (req, res) => {
  const skill = (req.query.skill || '').toLowerCase();
  try {
    const profiles = await sequelize.query(
      `SELECT id, projects FROM profiles`,
      { type: QueryTypes.SELECT }
    );
    const result = [];
    for (const profile of profiles) {
      const projects = JSON.parse(profile.projects || '[]');
      for (const p of projects) {
        const skills = (p.skills || []).map(s => String(s).toLowerCase());
        const text = (p.title || '') + ' ' + (p.description || '');
        if (!skill || skills.includes(skill) || (skill && text.toLowerCase().includes(skill))) {
          result.push({ profileId: profile.id, project: p });
        }
      }
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET /api/search?q=...
module.exports.searchProfiles = async (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  if (!q) {
      return this.getAllProfiles(req, res); // If search is empty, return all
  }
  const searchTerm = `%${q}%`; // Wildcards for LIKE
  try {
    // A more efficient way to search using raw SQL
    const profiles = await sequelize.query(
      `SELECT * FROM profiles WHERE 
       LOWER(name) LIKE :searchTerm OR 
       LOWER(email) LIKE :searchTerm OR 
       LOWER(education) LIKE :searchTerm OR 
       LOWER(skills) LIKE :searchTerm OR 
       LOWER(projects) LIKE :searchTerm`,
      {
        replacements: { searchTerm },
        type: QueryTypes.SELECT
      }
    );
    res.json(profiles.map(parseProfile));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET /api/skills/top
module.exports.getTopSkills = async (req, res) => {
  try {
    const profiles = await sequelize.query(
      `SELECT skills, projects FROM profiles`,
      { type: QueryTypes.SELECT }
    );
    const skillCounts = {};
    for (const profile of profiles) {
      const mainSkills = JSON.parse(profile.skills || '[]');
      const projects = JSON.parse(profile.projects || '[]');
      for (const skill of mainSkills) {
        skillCounts[skill.toLowerCase()] = (skillCounts[skill.toLowerCase()] || 0) + 1;
      }
      for (const project of projects) {
        for (const skill of project.skills || []) {
          skillCounts[skill.toLowerCase()] = (skillCounts[skill.toLowerCase()] || 0) + 1;
        }
      }
    }
    const sortedSkills = Object.entries(skillCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([skill, count]) => ({ skill, count }));
    res.json(sortedSkills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET /health
module.exports.healthCheck = (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
};
