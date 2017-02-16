create table person(
	pid int primary key,
	pname varchar(50),
	pwd varchar(50)
)

create sequence seq_person_id;

insert into person(pid,pname,pwd) values(seq_person_id.nextval,'a','a');
insert into person(pid,pname,pwd) values(seq_person_id.nextval,'b','b');
insert into person(pid,pname,pwd) values(seq_person_id.nextval,'c','c');
insert into person(pid,pname,pwd) values(seq_person_id.nextval,'d','d');
commit;

select * from person;