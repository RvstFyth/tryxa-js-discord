'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    discord_id: 'bigint',
    name: 'string',
    floor: { type: 'int', defaultValue: 1 }
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
