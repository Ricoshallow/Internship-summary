## 数据查询

- 查询数据库表的数据 ```SELECT * FROM <表名>```

- 条件查询  ```SELECT * FROM <表名> WHERE <条件表达式>```

- 投影查询  ```SELECT  <列名>, <列名>, <列名> FROM students;```

- 投影查询，并将列重命名  ```SELECT  <列名>, <列名>, <列名> <新列名> FROM students;```

- 查询结果集排序 ```ORDER BY <列名> DESC``` (DESC表示降序)

- 分页查询 ```LIMIT <M> OFFSET <N>```

    - LIMIT,每页显示数据量pageSize；
    - OFFSET计算查询第几页pageIndex，OFFSET = pageSize * (pageIndex - 1)

- 聚合查询 

    - ```COUNT```  表示查询所有列的行数
    - ```SUM```	计算某一列的合计值，该列必须为数值类型
    - ```AVG```	计算某一列的平均值，该列必须为数值类型
    - ```MAX```	计算某一列的最大值
    - ```MIN```	计算某一列的最小值

- 分组聚合

    ```GROUP BY <列名>``` 按列名分组

    ```SQL
    -- 统计各班的男生和女生人数
    SELECT class_id, gender, COUNT(*) num FROM students GROUP BY class_id, gender;
    -- 统计各班男生和女生的平均分
    SELECT class_id, gender, AVG(score) FROM students GROUP BY class_id, gender;
    ```

- 连接查询

    ```INNER JOIN <表名>``` 返回同时存在于两张表的行数据，最为常用

    ```RIGHT OUTER JOIN <表名>``` 返回右表都存在的行

    ```LEFT OUTER JOIN <表名>``` 返回左表都存在的行
    ```sql
    -- 选出所有学生，同时返回班级名称
    SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
    FROM students s
    INNER JOIN classes c
    ON s.class_id = c.id;
    ```


## 修改数据
- 插入数据

    ```INSERT INTO <表名> (字段1, 字段2, ...) VALUES (值1, 值2, ...);```

    ```sql
    -- 一次插入多条数据
    INSERT INTO students (class_id, name, gender, score) VALUES
  (1, '大宝', 'M', 87),
  (2, '二宝', 'M', 81);

    SELECT * FROM students;
    ```

- 更新数据

    ```UPDATE <表名> SET 字段1=值1, 字段2=值2, ... WHERE ...;```

    ```sql
    --更新成绩大于80的数据
    UPDATE students SET score=score+10 WHERE score<80;
    
    SELECT * FROM students;
    ```

- 删除数据

    ```DELETE FROM <表名> WHERE ...;```

    ```sql
    -- 删除id为5，6，7的数据
    DELETE FROM students WHERE id>=5 AND id<=7;
    
    SELECT * FROM students;
    ```