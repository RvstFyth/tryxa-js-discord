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
  return db.createTable('items', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    user_id: {type: 'int', defaultValue: null},
    name: {type: 'string', defaultValue: ''},
    rarity: {type: 'int', defaultValue: 0},
    slot: {type: 'string', defaultValue: ''},
    stats: {type: 'string', defaultValue: ''}
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
