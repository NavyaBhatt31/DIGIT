package org.egov.lib.admbndry.ejb.server;

import org.egov.exceptions.DuplicateElementException;
import org.egov.exceptions.NoSuchObjectException;
import org.egov.exceptions.TooManyValuesException;
import org.egov.infstr.junit.EgovHibernateTest;
import org.egov.lib.admbndry.HeirarchyTypeDAO;
import org.egov.lib.admbndry.HeirarchyTypeImpl;
import org.junit.Ignore;

import java.util.Date;

@Ignore
public class HeirarchyTypeManagerTest extends EgovHibernateTest {

	public void testGetHierarchyTypeByNameTest() throws NoSuchObjectException,
			TooManyValuesException, DuplicateElementException {
		final HeirarchyTypeImpl existing = new HeirarchyTypeImpl();
		existing.setCode("EGI_ADMIN");
		existing.setUpdatedTime(new Date());
		existing.setName("EGI_ADMINISTRATOR");
		final HeirarchyTypeServiceImpl htm = new HeirarchyTypeServiceImpl();
		htm.setHeirarchyTypeDAO(new HeirarchyTypeDAO(sessionFactory));
		htm.create(existing);
		final HeirarchyTypeImpl ht = (HeirarchyTypeImpl) htm
				.getHierarchyTypeByName("ADMINISTRATION");
		assertNotNull(ht);

	}

}
