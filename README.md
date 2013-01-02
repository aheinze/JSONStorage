Storage.js
==========

A simple storage helper inspired by the redis api.

# Usage

    var db = Storage.select("mydb");

    db.set("mykey", 1);

    console.log(db.get("mykey"));

## implemented methods

    set, get, exists, del, type, append, incr, decr, 
    llen, lpush, rpush, lset, lindex,
    hset, hget, hgetall, hexists, hkeys, hvals, hlen, hincrby, hmset, hmget
    