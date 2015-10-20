/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.model;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

/**
 *
 * @author Best
 */
@Entity
public class PatientPictureBefore implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Lob
    private byte[] contentBefore;
    private String nameBefore;
    private String mimeTypeBefore;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public byte[] getContentBefore() {
        return contentBefore;
    }

    public void setContentBefore(byte[] contentBefore) {
        this.contentBefore = contentBefore;
    }

    public String getNameBefore() {
        return nameBefore;
    }

    public void setNameBefore(String nameBefore) {
        this.nameBefore = nameBefore;
    }

    public String getMimeTypeBefore() {
        return mimeTypeBefore;
    }

    public void setMimeTypeBefore(String mimeTypeBefore) {
        this.mimeTypeBefore = mimeTypeBefore;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 17 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final PatientPictureBefore other = (PatientPictureBefore) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

}
