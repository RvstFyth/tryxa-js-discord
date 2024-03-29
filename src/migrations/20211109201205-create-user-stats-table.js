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

  return db.createTable('user_stats', {
    user_id: { type: 'int', primaryKey: true, autoIncrement: false },
    strength: { type: 'int', defaultValue: 1 },
    intelligence: { type: 'int', defaultValue: 1 },
    wisdom: { type: 'int', defaultValue: 1 },
    dexterity: { type: 'int', defaultValue: 1 },
    constitution: { type: 'int', defaultValue: 1 },
    luck: { type: 'int', defaultValue: 1 },
  });
};

exports.down = function(db) {
  return db.dropTable('user_stats');
};

exports._meta = {
  "version": 1
};
