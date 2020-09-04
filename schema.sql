CREATE TABLE public.department (
	id int8 NOT NULL,
	name text NOT NULL,
	CONSTRAINT dep_pkey PRIMARY KEY (id)
);
CREATE TABLE public.employee (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	fname text NOT NULL,
	lname text NOT NULL,
	startdate timestamptz NOT NULL DEFAULT now(),
	deptid int8 NOT NULL,
	CONSTRAINT emp_pkey PRIMARY KEY (id),
	CONSTRAINT emp_fkey FOREIGN KEY (deptid) REFERENCES department(id)
);