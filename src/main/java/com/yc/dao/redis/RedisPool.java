package com.yc.dao.redis;

import java.util.ResourceBundle;

import com.sun.org.apache.regexp.internal.recompile;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 * 以单利的模式创建一个jedis的连接池
 * 
 * @author WX
 *
 */
public class RedisPool {

	//private static RedisPool instance = new RedisPool();
	private static JedisPool pool;

	private RedisPool() {

		ResourceBundle bundle = ResourceBundle.getBundle("redis");
		if (bundle == null) {
			throw new IllegalArgumentException(
					"[redis.properties] is not found");
		}
		JedisPoolConfig config = new JedisPoolConfig();
		config.setMaxTotal(Integer.valueOf(bundle
				.getString("redis.pool.maxActive")));
		config.setMaxIdle(Integer.valueOf(bundle
				.getString("redis.pool.maxIdle")));
		config.setMaxWaitMillis(Long.valueOf(bundle
				.getString("redis.pool.maxWait")));
		config.setTestOnBorrow(Boolean.valueOf(bundle
				.getString("redis.pool.testOnBorrow")));
		config.setTestOnReturn(Boolean.valueOf(bundle
				.getString("redis.pool.testOnReturn")));
		pool = new JedisPool(config, bundle.getString("redis.ip"),
				Integer.valueOf(bundle.getString("redis.port")));
	}

	public synchronized static JedisPool getPool() {
		if (pool == null) {
			new RedisPool();
		}
		return pool;
	}

}
