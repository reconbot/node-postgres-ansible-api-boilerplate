import fs from 'fs';
import path from 'path';

import pgp from 'pg-promise';

export function load(basePath) {
  return fs.readdirSync(basePath).reduce((result, queryFile) => {
    const query = path.basename(queryFile, '.sql');
    result[query] = pgp.QueryFile(path.join(basePath, queryFile), {minify: true});
    return result;
  }, {});
}

export function create (table, fields) {
  const columns = fields.map(pgp.as.name).join(',');
  const setters = fields.map(field => `$[${field}]`).join(',');
  return `INSERT INTO ${pgp.as.name(table)} (${columns}) VALUES (${setters}) RETURNING *`;
}

export function update (table, fields) {
  const setters = fields.map(field => {
    return `${pgp.as.name(field)}=$[${field}]`;
  }).join(', ');
  return `UPDATE ${pgp.as.name(table)} SET ${setters} WHERE id=$[id] RETURNING *`;
}

export function destroy (table) {
  return `DELETE FROM ${pgp.as.name(table)} WHERE id=$[id]`;
}
