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
  return db.createTable('user_equipped', {
      user_id: {type: 'int', primaryKey: true, autoIncrement: false},
      head: {type: 'int', defaultValue: null},
      body: {type: 'int', defaultValue: null},
      hands: {type: 'int', defaultValue: null},
      legs: {type: 'int', defaultValue: null},
      weapon: {type: 'int', defaultValue: null},
      offhand: {type: 'int', defaultValue: null},
      lfinger: {type: 'int', defaultValue: null},
      rfinger: {type: 'int', defaultValue: null},
  });
};

exports.down = function(db) {
  return db.dropTable('user_equipped');
};

exports._meta = {
  "version": 1
};
